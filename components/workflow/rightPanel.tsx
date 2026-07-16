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
import { useState, useRef } from "react";
import { INTEGRATIONS, type IntegrationTab } from "./integrations";

type RightPanelProps = {
  onClose: () => void;
  onAddNode: (name: string) => void;
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

function ToolsSection({ onAddNode }: { onAddNode: (label: string) => void }) {
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
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-gray-100 text-gray-500">
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

export function RightPanel({ onClose, onAddNode }: RightPanelProps) {
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
        {activeSection === "tools" && <ToolsSection onAddNode={onAddNode} />}
        {activeSection === "chat" && <ChatSection />}
        {activeSection === "logs" && <LogsSection />}
      </div>
    </div>
  );
}

