import { NextResponse } from "next/server";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import nodemailer from "nodemailer";

type WorkflowNodeData = {
  label: string;
  kind?: string;
  desc?: string;
  enabled?: boolean;
  config?: Record<string, string>;
};

type WorkflowNode = {
  id: string;
  data: WorkflowNodeData;
};

type WorkflowEdge = {
  source: string;
  target: string;
};

type WorkflowLog = {
  level: "info" | "warn" | "error" | "success";
  msg: string;
  time: string;
};

type WorkflowStep = {
  id: string;
  label: string;
  status: "idle" | "done" | "skipped" | "error";
  output?: unknown;
  error?: string;
};

type ExecutionContext = {
  payload: unknown;
  last: unknown;
  outputs: Record<string, unknown>;
};

const currentTime = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

function log(level: WorkflowLog["level"], msg: string): WorkflowLog {
  return { level, msg, time: currentTime() };
}

function writeTerminalLog(entry: WorkflowLog) {
  const message = `[workflow ${entry.time}] ${entry.level.toUpperCase()}: ${entry.msg}`;

  if (entry.level === "error") {
    console.error(message);
    return;
  }

  if (entry.level === "warn") {
    console.warn(message);
    return;
  }

  console.log(message);
}

function pushLog(
  logs: WorkflowLog[],
  level: WorkflowLog["level"],
  msg: string,
) {
  const entry = log(level, msg);
  logs.push(entry);
  writeTerminalLog(entry);
}

function getExecutionOrder(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const indegree = new Map(nodes.map((node) => [node.id, 0]));
  const outgoing = new Map(nodes.map((node) => [node.id, [] as string[]]));

  for (const edge of edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) continue;
    outgoing.get(edge.source)?.push(edge.target);
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1);
  }

  const queue = nodes
    .filter((node) => (indegree.get(node.id) ?? 0) === 0)
    .map((node) => node.id);
  const orderedIds: string[] = [];

  while (queue.length > 0) {
    const id = queue.shift();
    if (!id) continue;
    orderedIds.push(id);

    for (const target of outgoing.get(id) ?? []) {
      const next = (indegree.get(target) ?? 0) - 1;
      indegree.set(target, next);
      if (next === 0) queue.push(target);
    }
  }

  const remainingIds = nodes
    .map((node) => node.id)
    .filter((id) => !orderedIds.includes(id));

  return [...orderedIds, ...remainingIds];
}

function stringify(value: unknown) {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return JSON.stringify(value, null, 2);
}

function applyTemplate(template: string, context: ExecutionContext) {
  return template
    .replaceAll("{{last}}", stringify(context.last))
    .replaceAll("{{payload}}", stringify(context.payload));
}

function parseJsonMaybe(value: string) {
  if (!value.trim()) return {};
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function cleanScrapedText(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 12000);
}

function valueFromPreviousUrl(context: ExecutionContext) {
  if (
    context.last &&
    typeof context.last === "object" &&
    "url" in context.last &&
    typeof context.last.url === "string"
  ) {
    return context.last.url;
  }

  if (
    context.payload &&
    typeof context.payload === "object" &&
    "url" in context.payload &&
    typeof context.payload.url === "string"
  ) {
    return context.payload.url;
  }

  return "";
}

async function runScraper(config: Record<string, string>, context: ExecutionContext) {
  const url = config.url || valueFromPreviousUrl(context);
  if (!url) throw new Error("Web Scraper needs a URL");

  const loader = new CheerioWebBaseLoader(url, {
    selector: "html",
    timeout: 15000,
    headers: {
      "User-Agent": "AutomatorWorkflow/1.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  const $ = await loader.scrape();
  $("script, style, noscript, svg, iframe").remove();

  const title = cleanScrapedText($("title").first().text());
  const description = cleanScrapedText(
    $('meta[name="description"]').attr("content") ?? "",
  );
  const text =
    ["main", "article", "body", "html"]
      .map((selector) => cleanScrapedText($(selector).first().text()))
      .find((content) => content.length > 0) ||
    cleanScrapedText([title, description].filter(Boolean).join(" "));

  if (!text) {
    throw new Error(
      "Web Scraper could not extract page text. The page may block scraping or render content only in JavaScript.",
    );
  }

  return {
    url,
    title,
    description,
    text,
  };
}

async function runHttpRequest(
  config: Record<string, string>,
  context: ExecutionContext,
) {
  const url = config.url || valueFromPreviousUrl(context);
  if (!url) throw new Error("HTTP Request needs a URL");

  const method = (config.method || "GET").toUpperCase();
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "GET" ? undefined : stringify(parseJsonMaybe(config.body || "")),
  });
  const text = await response.text();

  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(`HTTP request failed with ${response.status}`);
  }

  return data;
}

async function runOpenRouter(
  config: Record<string, string>,
  context: ExecutionContext,
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");

  const model =
    config.model ||
    process.env.OPENROUTER_MODEL ||
    "inclusionai/ling-3.0-flash:free";
  const maxTokens = Math.min(
    Math.max(Number(config.maxTokens || process.env.OPENROUTER_MAX_TOKENS || 256), 1),
    1000,
  );
  const prompt =
    config.prompt || "Use the previous workflow output and respond clearly.";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-OpenRouter-Title": "Automator",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [
        {
          role: "system",
          content:
            "You are executing one node in an automation workflow. Use the workflow context and return only the useful result.",
        },
        {
          role: "user",
          content: `${prompt}\n\nWorkflow payload:\n${stringify(
            context.payload,
          )}\n\nPrevious step output:\n${stringify(context.last)}`,
        },
      ],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("[workflow] OpenRouter request failed", {
      status: response.status,
      statusText: response.statusText,
      model,
      error: data?.error ?? data,
    });
    throw new Error(data?.error?.message || `OpenRouter failed with ${response.status}`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenRouter returned an empty response");
  return content;
}

async function runEmail(config: Record<string, string>, context: ExecutionContext) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    throw new Error(
      "SMTP_HOST, SMTP_USER, SMTP_PASS, and SMTP_FROM/SMTP_USER are required to send email",
    );
  }
  if (!config.to) throw new Error("Send Email needs a recipient");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from,
    to: config.to,
    subject: config.subject || "Workflow result",
    text: applyTemplate(config.body || "{{last}}", context),
  });

  return {
    accepted: info.accepted,
    rejected: info.rejected,
    messageId: info.messageId,
  };
}

async function runSlack(config: Record<string, string>, context: ExecutionContext) {
  if (!config.webhookUrl) throw new Error("Slack needs a webhook URL");

  const response = await fetch(config.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: applyTemplate(config.message || "{{last}}", context),
    }),
  });

  if (!response.ok) throw new Error(`Slack webhook failed with ${response.status}`);
  return { ok: true };
}

async function executeNode(node: WorkflowNode, context: ExecutionContext) {
  const kind = node.data.kind ?? node.data.label;
  const config = node.data.config ?? {};

  switch (kind) {
    case "Webhook Trigger":
    case "Form Input":
      return parseJsonMaybe(config.samplePayload || "");
    case "Schedule":
      return { cron: config.cron || "manual", triggeredAt: new Date().toISOString() };
    case "Web Scraper":
      return runScraper(config, context);
    case "HTTP Request":
      return runHttpRequest(config, context);
    case "Chatbot":
    case "GPT-4o":
    case "Gemini":
    case "Claude":
      return runOpenRouter(config, context);
    case "Send Email":
      return runEmail(config, context);
    case "Slack":
      return runSlack(config, context);
    case "Formatter":
    case "Message Template":
      return applyTemplate(config.template || "{{last}}", context);
    case "Filter": {
      const contains = config.contains || "";
      const passed = !contains || stringify(context.last).includes(contains);
      if (!passed) throw new Error(`Filter did not match "${contains}"`);
      return context.last;
    }
    case "Delay": {
      const seconds = Math.min(Number(config.seconds || 1), 10);
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      return { delayedSeconds: seconds };
    }
    case "Database":
      return {
        key: config.key || node.id,
        value: context.last,
      };
    default:
      throw new Error(`${kind} is not implemented yet`);
  }
}

export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(request: Request) {
  const logs: WorkflowLog[] = [];
  const steps: WorkflowStep[] = [];
  pushLog(logs, "info", "Workflow started");

  try {
    const body = await request.json();
    const nodes = Array.isArray(body.nodes) ? (body.nodes as WorkflowNode[]) : [];
    const edges = Array.isArray(body.edges) ? (body.edges as WorkflowEdge[]) : [];

    if (nodes.length === 0) {
      return NextResponse.json({ error: "No workflow nodes received" }, { status: 400 });
    }

    const nodesById = new Map(nodes.map((node) => [node.id, node]));
    const context: ExecutionContext = {
      payload: {},
      last: undefined,
      outputs: {},
    };
    let failed = false;

    for (const id of getExecutionOrder(nodes, edges)) {
      const node = nodesById.get(id);
      if (!node) continue;

      if (node.data.enabled === false) {
        steps.push({ id, label: node.data.label, status: "skipped" });
        pushLog(logs, "warn", `${node.data.label} skipped because it is disabled`);
        continue;
      }

      try {
        pushLog(logs, "info", `${node.data.label} started`);
        const output = await executeNode(node, context);

        if ((node.data.kind ?? node.data.label).includes("Trigger")) {
          context.payload = output;
        }
        context.last = output;
        context.outputs[id] = output;

        steps.push({ id, label: node.data.label, status: "done", output });
        pushLog(logs, "success", `${node.data.label} completed`);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown workflow error";
        steps.push({ id, label: node.data.label, status: "error", error: message });
        pushLog(logs, "error", `${node.data.label} failed: ${message}`);
        failed = true;
        break;
      }
    }

    pushLog(
      logs,
      failed ? "error" : "success",
      failed ? "Workflow stopped because a step failed" : "Workflow finished",
    );
    return NextResponse.json({ steps, logs, outputs: context.outputs, ok: !failed });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Workflow execution failed";
    pushLog(logs, "error", message);
    return NextResponse.json({ error: message, steps, logs }, { status: 500 });
  }
}
