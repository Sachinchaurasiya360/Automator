"use client";
import {
  Settings,
  Wrench,
  MessageSquare,
  ScrollText,
  X,
  Search,
  Globe,
  Code2,
  Filter,
  ChevronRight,
  Send,
  Circle,
} from "lucide-react";
import { useState, useRef } from "react";

type RightPanelProps = {
  onClose: () => void;
};

type Section = "properties" | "tools" | "chat" | "logs";
type ToolTab = "apps" | "ai" | "tools";

// ── Brand SVG logos ───────────────────────────────────────────────
function GoogleSheetsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <rect width="24" height="24" rx="3" fill="#0F9D58" />
      <rect x="5" y="7" width="14" height="1.8" rx="0.4" fill="white" />
      <rect x="5" y="11.1" width="14" height="1.8" rx="0.4" fill="white" />
      <rect x="5" y="15.2" width="14" height="1.8" rx="0.4" fill="white" />
      <rect x="9.6" y="7" width="1.8" height="10" rx="0.4" fill="white" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path d="M5.8 14.4a2 2 0 1 1-2-2h2v2Z" fill="#E01E5A" />
      <path d="M6.8 14.4a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0v-5Z" fill="#E01E5A" />
      <path d="M9.6 5.8a2 2 0 1 1 2-2v2H9.6Z" fill="#36C5F0" />
      <path d="M9.6 6.8a2 2 0 0 1 0 4H4.6a2 2 0 0 1 0-4h5Z" fill="#36C5F0" />
      <path d="M18.2 9.6a2 2 0 1 1 2 2h-2V9.6Z" fill="#2EB67D" />
      <path d="M17.2 9.6a2 2 0 0 1-4 0V4.6a2 2 0 0 1 4 0v5Z" fill="#2EB67D" />
      <path d="M14.4 18.2a2 2 0 1 1-2 2v-2h2Z" fill="#ECB22E" />
      <path d="M14.4 17.2a2 2 0 0 1 0-4h5a2 2 0 0 1 0 4h-5Z" fill="#ECB22E" />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <rect width="24" height="24" rx="4" fill="white" stroke="#E5E7EB" />
      <path
        d="M6 5.5h7.5l4 4.5V19H6V5.5Z"
        fill="white"
        stroke="#111827"
        strokeWidth="1.2"
      />
      <path d="M13.5 5.5V10H17.5" stroke="#111827" strokeWidth="1.2" fill="none" />
      <path d="M8.5 10.5h7M8.5 13h7M8.5 15.5h5" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M22.28 9.98a5.47 5.47 0 0 0-.47-4.49 5.53 5.53 0 0 0-5.95-2.65A5.47 5.47 0 0 0 11.74 1a5.53 5.53 0 0 0-5.27 3.83 5.47 5.47 0 0 0-3.66 2.65 5.53 5.53 0 0 0 .68 6.48 5.47 5.47 0 0 0 .47 4.49 5.53 5.53 0 0 0 5.95 2.65A5.47 5.47 0 0 0 12.26 23a5.53 5.53 0 0 0 5.27-3.83 5.47 5.47 0 0 0 3.66-2.65 5.53 5.53 0 0 0-.91-6.54ZM12.26 21.5a4.1 4.1 0 0 1-2.62-.95l.13-.07 4.35-2.51a.72.72 0 0 0 .36-.62v-6.14l1.84 1.06a.07.07 0 0 1 .04.05v5.08a4.12 4.12 0 0 1-4.1 4.1Zm-8.83-3.77a4.08 4.08 0 0 1-.49-2.75l.13.08 4.35 2.51a.71.71 0 0 0 .72 0l5.31-3.07v2.12a.07.07 0 0 1-.03.06L8.97 19.2a4.12 4.12 0 0 1-5.54-1.47ZM2.9 8.27a4.1 4.1 0 0 1 2.13-1.8v5.16a.71.71 0 0 0 .36.62l5.3 3.06-1.83 1.06a.07.07 0 0 1-.07 0L4.1 13.9A4.12 4.12 0 0 1 2.9 8.27Zm15.1 3.53-5.31-3.08 1.83-1.06a.07.07 0 0 1 .07 0l4.69 2.71a4.12 4.12 0 0 1-.64 7.43v-5.38a.72.72 0 0 0-.64-.62Zm1.83-2.77-.13-.08-4.34-2.52a.71.71 0 0 0-.72 0L9.33 9.5V7.38a.07.07 0 0 1 .03-.06l4.69-2.7a4.12 4.12 0 0 1 5.78 4.21ZM8.39 12.85 6.55 11.8a.07.07 0 0 1-.04-.05V6.67a4.12 4.12 0 0 1 6.75-3.16l-.13.08-4.35 2.51a.72.72 0 0 0-.36.62l-.03 6.13Zm1-2.16 2.36-1.36 2.37 1.37v2.72l-2.36 1.37-2.37-1.37V10.69Z" />
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <path
        d="M12 2C12 2 13.5 8.5 18 10.5C13.5 12.5 12 19 12 19C12 19 10.5 12.5 6 10.5C10.5 8.5 12 2 12 2Z"
        fill="url(#gem-grad)"
      />
      <defs>
        <linearGradient id="gem-grad" x1="6" y1="2" x2="18" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <rect width="24" height="24" rx="6" fill="#D97757" />
      <path
        d="M8.5 16.5L12 7.5L15.5 16.5M9.8 13.5H14.2"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TABS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "properties", label: "Properties", icon: <Settings size={13} /> },
  { id: "tools", label: "Tools", icon: <Wrench size={13} /> },
  { id: "chat", label: "Chat", icon: <MessageSquare size={13} /> },
  { id: "logs", label: "Logs", icon: <ScrollText size={13} /> },
];

const TOOL_ITEMS: Record<ToolTab, { name: string; desc: string; icon: React.ReactNode }[]> = {
  apps: [
    { name: "Google Sheets", desc: "Read and write spreadsheet data", icon: <GoogleSheetsIcon /> },
    { name: "Slack", desc: "Send messages and notifications", icon: <SlackIcon /> },
    { name: "Notion", desc: "Create and update pages", icon: <NotionIcon /> },
  ],
  ai: [
    { name: "GPT-4o", desc: "OpenAI text generation", icon: <OpenAIIcon /> },
    { name: "Gemini", desc: "Google AI generation", icon: <GeminiIcon /> },
    { name: "Claude", desc: "Anthropic text generation", icon: <ClaudeIcon /> },
  ],
  tools: [
    { name: "HTTP Request", desc: "Make API calls", icon: <Globe size={14} /> },
    { name: "Code", desc: "Run JavaScript snippets", icon: <Code2 size={14} /> },
    { name: "Filter", desc: "Conditionally route data", icon: <Filter size={14} /> },
  ],
};

const LOGS = [
  { level: "info", msg: "Workflow started", time: "12:04:01" },
  { level: "info", msg: "Node n1 executed successfully", time: "12:04:02" },
  { level: "warn", msg: "Node n2 retrying (attempt 2/3)", time: "12:04:03" },
  { level: "error", msg: "Node n2 failed: timeout", time: "12:04:05" },
];

function PropertiesSection() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
        Node
      </p>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-gray-600">Label</label>
        <input
          className="h-8 w-full rounded-[8px] border border-gray-200 bg-gray-50 px-3 text-[13px] text-gray-900 outline-none focus:border-gray-400"
          defaultValue="Research Node"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-gray-600">Description</label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-900 outline-none focus:border-gray-400"
          placeholder="What does this node do?"
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
          onClick={() => setEnabled((v) => !v)}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
            enabled ? "bg-gray-900" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              enabled ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function ToolsSection() {
  const [tab, setTab] = useState<ToolTab>("apps");
  const [query, setQuery] = useState("");

  const filtered = TOOL_ITEMS[tab].filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.desc.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden p-1">
      {/* Sub-tabs */}
      <div className="flex gap-1 rounded-[8px] bg-gray-100 p-1">
        {(["apps", "ai", "tools"] as ToolTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-[6px] py-1 text-[12px] font-medium capitalize transition-colors ${
              tab === t
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-gray-50 px-2.5">
        <Search size={12} className="text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="h-8 flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Items */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
        {filtered.map((item) => (
          <button
            key={item.name}
            className="group flex items-center gap-3 rounded-[8px] border border-gray-100 bg-white px-3 py-2.5 text-left transition-colors hover:border-gray-200 hover:bg-gray-50"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-gray-100 text-gray-500">
              {item.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-gray-900">{item.name}</p>
              <p className="truncate text-[11.5px] text-gray-500">{item.desc}</p>
            </div>
            <ChevronRight size={12} className="shrink-0 text-gray-300 group-hover:text-gray-500" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-center text-[12.5px] text-gray-400">No results</p>
        )}
      </div>
    </div>
  );
}

function ChatSection() {
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! Ask me anything about this workflow." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: trimmed },
      { from: "ai", text: "I'm reviewing your workflow…" },
    ]);
    setInput("");
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="flex h-full flex-col gap-2 p-1">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
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
      <div className="flex items-center gap-2 rounded-[8px] border border-gray-200 bg-gray-50 pl-3 pr-1.5 py-1.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about this workflow…"
          className="flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400"
        />
        <button
          onClick={send}
          className="flex size-6 items-center justify-center rounded-[6px] bg-gray-900 text-white hover:bg-gray-700"
        >
          <Send size={11} />
        </button>
      </div>
    </div>
  );
}

function LogsSection() {
  const colors: Record<string, string> = {
    info: "text-blue-500",
    warn: "text-amber-500",
    error: "text-red-500",
  };

  return (
    <div className="flex h-full flex-col gap-1.5 overflow-y-auto p-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
        Run logs
      </p>
      {LOGS.map((log, i) => (
        <div
          key={i}
          className="flex items-start gap-2.5 rounded-[8px] border border-gray-100 bg-gray-50 px-3 py-2"
        >
          <Circle
            size={7}
            className={`mt-1 shrink-0 fill-current ${colors[log.level]}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] text-gray-800">{log.msg}</p>
          </div>
          <span className="shrink-0 font-mono text-[10.5px] text-gray-400">{log.time}</span>
        </div>
      ))}
    </div>
  );
}

export function RightPanel({ onClose }: RightPanelProps) {
  const [activeSection, setActiveSection] = useState<Section>("properties");

  return (
    <div className="flex w-96 flex-col rounded-[14px] border border-gray-200 bg-white shadow-lg" style={{ height: "calc(100vh - 120px)" }}>
      {/* Tab bar */}
      <div className="flex shrink-0 items-center border-b border-gray-100 px-3 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
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

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden p-3">
        {activeSection === "properties" && <PropertiesSection />}
        {activeSection === "tools" && <ToolsSection />}
        {activeSection === "chat" && <ChatSection />}
        {activeSection === "logs" && <LogsSection />}
      </div>
    </div>
  );
}

