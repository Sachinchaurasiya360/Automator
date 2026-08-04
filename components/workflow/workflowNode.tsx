import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { Check, Loader2, X } from "lucide-react";
import { getIntegration } from "./integrations";

export type NodeStatus = "idle" | "running" | "done" | "skipped" | "error";

export type WorkflowNodeData = {
  label: string;
  /** Integration name used to resolve the icon/description. */
  kind?: string;
  desc?: string;
  status?: NodeStatus;
  enabled?: boolean;
  config?: Record<string, string>;
};

export type WorkflowNodeType = Node<WorkflowNodeData, "workflow">;

const HANDLE_CLASS =
  "!size-2.5 !border-2 !border-white !bg-gray-400 transition-colors";

export function WorkflowNode({ id, data, selected }: NodeProps<WorkflowNodeType>) {
  const { deleteElements } = useReactFlow();
  const integration = getIntegration(data.kind ?? data.label);
  const desc = data.desc ?? integration.desc;
  const status = data.status ?? "idle";
  const enabled = data.enabled ?? true;

  return (
    <div
      className={`group relative w-60 rounded-[12px] border bg-white px-3.5 py-3 shadow-sm transition-all ${
        selected
          ? "border-gray-900 shadow-md ring-2 ring-gray-900/10"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      } ${!enabled ? "opacity-60" : ""} ${
        status === "running" ? "border-amber-400 ring-2 ring-amber-200" : ""
      } ${
        status === "done" ? "border-emerald-300" : ""
      } ${
        status === "skipped" ? "border-gray-300 bg-gray-50" : ""
      } ${
        status === "error" ? "border-red-300 bg-red-50" : ""
      }`}
    >
      <Handle type="target" position={Position.Top} className={HANDLE_CLASS} />

      <button
        type="button"
        aria-label="Delete node"
        onClick={(e) => {
          e.stopPropagation();
          void deleteElements({ nodes: [{ id }] });
        }}
        className="nodrag absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 opacity-0 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
      >
        <X size={12} strokeWidth={2.5} />
      </button>

      <div className="flex items-center gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-[9px] ${integration.accent} ring-1 ring-inset ring-gray-900/5`}
        >
          {integration.icon}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-gray-900">
            {data.label}
          </p>
          <p className="truncate text-[11.5px] text-gray-500">{desc}</p>
        </div>

        {status === "running" && (
          <Loader2 size={15} className="shrink-0 animate-spin text-amber-500" />
        )}
        {status === "done" && (
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
        {status === "skipped" && (
          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
            Off
          </span>
        )}
        {status === "error" && (
          <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-600">
            Error
          </span>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className={HANDLE_CLASS} />
    </div>
  );
}
