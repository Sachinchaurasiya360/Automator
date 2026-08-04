"use client";
import {
  Settings,
  Wrench,
  MessageSquare,
  ScrollText,
  X,
  Search,
  Send,
  Circle,
  GripVertical,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { INTEGRATIONS, type IntegrationTab } from "./integrations";
import type { WorkflowNodeData, WorkflowNodeType } from "./workflowNode";

export type WorkflowLog = {
  level: "info" | "warn" | "error" | "success";
  msg: string;
  time: string;
};

type RightPanelProps = {
  onClose: () => void;
  onAddNode: (name: string) => void;
  selectedNode: WorkflowNodeType | null;
  onUpdateNode: (id: string, data: Partial<WorkflowNodeData>) => void;
  logs: WorkflowLog[];
  activeSection: Section;
  onSectionChange: (section: Section) => void;
};

type Section = "properties" | "tools" | "chat" | "logs";
type ToolTab = IntegrationTab;

const TABS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "properties", label: "Properties", icon: <Settings size={13} /> },
  { id: "tools", label: "Tools", icon: <Wrench size={13} /> },
  { id: "chat", label: "Chat", icon: <MessageSquare size={13} /> },
  { id: "logs", label: "Logs", icon: <ScrollText size={13} /> },
];

const TOOL_ITEMS = INTEGRATIONS;
const TOOL_TABS: { id: ToolTab; label: string }[] = [
  { id: "triggers", label: "Triggers" },
  { id: "apps", label: "Apps" },
  { id: "ai", label: "AI" },
  { id: "tools", label: "Tools" },
];

const CONFIG_FIELDS: Record<
  string,
  { key: string; label: string; placeholder: string; multiline?: boolean }[]
> = {
  "Webhook Trigger": [
    { key: "samplePayload", label: "Sample payload", placeholder: '{"topic":"latest product updates"}', multiline: true },
  ],
  "Form Input": [
    { key: "samplePayload", label: "Sample payload", placeholder: '{"email":"user@example.com","url":"https://example.com"}', multiline: true },
  ],
  Schedule: [
    { key: "cron", label: "Cron", placeholder: "0 9 * * *" },
  ],
  "Web Scraper": [
    { key: "url", label: "URL", placeholder: "https://example.com/blog" },
  ],
  "HTTP Request": [
    { key: "url", label: "URL", placeholder: "https://api.example.com/items" },
    { key: "method", label: "Method", placeholder: "GET" },
    { key: "body", label: "Body", placeholder: '{"limit":10}', multiline: true },
  ],
  Chatbot: [
    { key: "model", label: "OpenRouter model", placeholder: "inclusionai/ling-3.0-flash:free" },
    { key: "maxTokens", label: "Max tokens", placeholder: "256" },
    { key: "prompt", label: "Prompt", placeholder: "Summarize the previous step and write a helpful response.", multiline: true },
  ],
  "GPT-4o": [
    { key: "model", label: "OpenRouter model", placeholder: "openai/gpt-4o" },
    { key: "maxTokens", label: "Max tokens", placeholder: "256" },
    { key: "prompt", label: "Prompt", placeholder: "Use the previous step output to answer clearly.", multiline: true },
  ],
  Gemini: [
    { key: "model", label: "OpenRouter model", placeholder: "google/gemini-2.5-flash" },
    { key: "maxTokens", label: "Max tokens", placeholder: "256" },
    { key: "prompt", label: "Prompt", placeholder: "Use the previous step output to answer clearly.", multiline: true },
  ],
  Claude: [
    { key: "model", label: "OpenRouter model", placeholder: "anthropic/claude-3.5-sonnet" },
    { key: "maxTokens", label: "Max tokens", placeholder: "256" },
    { key: "prompt", label: "Prompt", placeholder: "Use the previous step output to answer clearly.", multiline: true },
  ],
  "Send Email": [
    { key: "to", label: "To", placeholder: "person@example.com" },
    { key: "subject", label: "Subject", placeholder: "Workflow result" },
    { key: "body", label: "Body", placeholder: "Use {{last}} for the previous step output.", multiline: true },
  ],
  Slack: [
    { key: "webhookUrl", label: "Webhook URL", placeholder: "https://hooks.slack.com/services/..." },
    { key: "message", label: "Message", placeholder: "Use {{last}} for the previous step output.", multiline: true },
  ],
  Database: [
    { key: "key", label: "Record key", placeholder: "lead-summary" },
  ],
  Filter: [
    { key: "contains", label: "Continue if output contains", placeholder: "approved" },
  ],
  Formatter: [
    { key: "template", label: "Template", placeholder: "Result: {{last}}", multiline: true },
  ],
  "Message Template": [
    { key: "template", label: "Template", placeholder: "Hello, here is the result: {{last}}", multiline: true },
  ],
  Delay: [
    { key: "seconds", label: "Seconds", placeholder: "2" },
  ],
};

function PropertiesSection({
  selectedNode,
  onUpdateNode,
}: {
  selectedNode: WorkflowNodeType | null;
  onUpdateNode: (id: string, data: Partial<WorkflowNodeData>) => void;
}) {
  if (!selectedNode) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[8px] border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
        <p className="text-[13px] font-medium text-gray-700">Select a node</p>
        <p className="mt-1 text-[12px] leading-relaxed text-gray-400">
          Pick any block on the canvas to edit its label, description, and run state.
        </p>
      </div>
    );
  }

  const data = selectedNode.data;
  const selectedNodeId = selectedNode.id;
  const enabled = data.enabled ?? true;
  const kind = data.kind ?? data.label;
  const fields = CONFIG_FIELDS[kind] ?? [];
  const config = data.config ?? {};

  function updateConfig(key: string, value: string) {
    onUpdateNode(selectedNodeId, {
      config: {
        ...config,
        [key]: value,
      },
    });
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-1">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
          Node
        </p>
        <span className="rounded-full bg-gray-100 px-2 py-1 text-[10.5px] font-medium text-gray-500">
          {data.kind ?? data.label}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-gray-600">Label</label>
        <input
          className="h-8 w-full rounded-[8px] border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-900 outline-none focus:border-gray-400"
          value={data.label}
          onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-gray-600">Description</label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-gray-400"
          value={data.desc ?? ""}
          placeholder="What does this node do?"
          onChange={(e) => onUpdateNode(selectedNode.id, { desc: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2.5">
        <div>
          <p className="text-[12.5px] font-medium text-gray-700">Enabled</p>
          <p className="text-[11.5px] text-gray-400">
            {enabled ? "Node will run in the workflow" : "Node is skipped during execution"}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onUpdateNode(selectedNode.id, { enabled: !enabled })}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
            enabled ? "bg-gray-900" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              enabled ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {fields.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            Config
          </p>
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-gray-600">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-gray-400"
                  value={config[field.key] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => updateConfig(field.key, e.target.value)}
                />
              ) : (
                <input
                  className="h-8 w-full rounded-[8px] border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-900 outline-none focus:border-gray-400"
                  value={config[field.key] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => updateConfig(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ToolsSection({ onAddNode }: { onAddNode: (label: string) => void }) {
  const [tab, setTab] = useState<ToolTab>("triggers");
  const [query, setQuery] = useState("");

  const filtered = TOOL_ITEMS[tab].filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.desc.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-1">
      <div className="grid grid-cols-4 gap-1 rounded-[8px] bg-gray-100 p-1">
        {TOOL_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-[6px] py-1 text-[11.5px] font-medium transition-colors ${
              tab === t.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-gray-50 px-2.5">
        <Search size={12} className="text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="h-8 flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
        {filtered.map((item) => (
          <button
            key={item.name}
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/reactflow", item.name);
              e.dataTransfer.effectAllowed = "move";
            }}
            onClick={() => onAddNode(item.name)}
            title="Click to add, or drag onto the canvas"
            className="group flex cursor-grab items-center gap-3 rounded-[8px] border border-gray-100 bg-white px-3 py-2.5 text-left transition-colors hover:border-gray-200 hover:bg-gray-50 active:cursor-grabbing"
          >
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-[6px] ${item.accent} text-gray-600 ring-1 ring-inset ring-gray-900/5`}
            >
              {item.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-gray-900">{item.name}</p>
              <p className="truncate text-[11.5px] text-gray-500">{item.desc}</p>
            </div>
            <GripVertical size={13} className="shrink-0 text-gray-300 group-hover:text-gray-500" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-center text-[12.5px] text-gray-400">No results</p>
        )}
      </div>
    </div>
  );
}

function ChatSection({ selectedNode }: { selectedNode: WorkflowNodeType | null }) {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Ask me about the current workflow or add a Chatbot node from the AI tab.",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const context = selectedNode
      ? `Selected node: ${selectedNode.data.label}.`
      : "No node is selected.";
    setMessages((m) => [
      ...m,
      { from: "user", text: trimmed },
      { from: "ai", text: `${context} I would connect trigger, action, and output blocks in that order.` },
    ]);
    setInput("");
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="flex h-full flex-col gap-2 p-1">
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-[10px] px-3 py-2 text-[12.5px] leading-relaxed ${
              m.from === "user"
                ? "ml-auto bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-gray-50 py-1.5 pl-3 pr-1.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about this workflow..."
          className="flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={send}
          className="flex size-6 items-center justify-center rounded-[6px] bg-gray-900 text-white hover:bg-gray-700"
        >
          <Send size={11} />
        </button>
      </div>
    </div>
  );
}

function LogsSection({ logs }: { logs: WorkflowLog[] }) {
  const colors: Record<WorkflowLog["level"], string> = {
    info: "text-blue-500",
    warn: "text-amber-500",
    error: "text-red-500",
    success: "text-emerald-500",
  };

  return (
    <div className="flex h-full flex-col gap-1.5 overflow-y-auto p-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
        Run logs
      </p>
      {logs.length === 0 && (
        <p className="rounded-[8px] border border-dashed border-gray-200 bg-gray-50 px-3 py-4 text-center text-[12.5px] text-gray-400">
          Run the workflow to see step-by-step logs.
        </p>
      )}
      {logs.map((log, i) => (
        <div
          key={`${log.time}-${i}`}
          className="flex items-start gap-2.5 rounded-[8px] border border-gray-100 bg-gray-50 px-3 py-2"
        >
          <Circle
            size={7}
            className={`mt-1 shrink-0 fill-current ${colors[log.level]}`}
          />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] text-gray-800">{log.msg}</p>
          </div>
          <span className="shrink-0 font-mono text-[10.5px] text-gray-400">{log.time}</span>
        </div>
      ))}
    </div>
  );
}

export function RightPanel({
  onClose,
  onAddNode,
  selectedNode,
  onUpdateNode,
  logs,
  activeSection,
  onSectionChange,
}: RightPanelProps) {
  return (
    <div
      className="flex w-96 flex-col rounded-[14px] border border-gray-200 bg-white shadow-lg"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <div className="flex shrink-0 items-center border-b border-gray-100 px-3 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSectionChange(tab.id)}
            className={`flex items-center gap-1.5 px-2 pb-2 pt-1 text-[12px] font-medium transition-colors ${
              activeSection === tab.id
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="ml-auto flex size-6 items-center justify-center rounded-[6px] text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={13} />
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-3">
        {activeSection === "properties" && (
          <PropertiesSection selectedNode={selectedNode} onUpdateNode={onUpdateNode} />
        )}
        {activeSection === "tools" && <ToolsSection onAddNode={onAddNode} />}
        {activeSection === "chat" && <ChatSection selectedNode={selectedNode} />}
        {activeSection === "logs" && <LogsSection logs={logs} />}
      </div>
    </div>
  );
}
