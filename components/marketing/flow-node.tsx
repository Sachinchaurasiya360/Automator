import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { Check } from "lucide-react";

export type FlowCardHandle = {
  type: "source" | "target";
  position: Position;
  id: string;
};

export type FlowCardData = {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  tone: "light" | "dark";
  badge?: boolean;
  handles: FlowCardHandle[];
};

export type FlowCardNode = Node<FlowCardData, "flowCard">;

const handleStyle = {
  width: 7,
  height: 7,
  background: "#FAFAFA",
  border: "1.5px solid #D1D5DB",
};

export function FlowCard({ data }: NodeProps<FlowCardNode>) {
  return (
    <div
      className={
        "relative w-[190px] rounded-[10px] border p-3 " +
        (data.tone === "dark" ? "border-gray-900 bg-gray-900" : "border-gray-200 bg-white")
      }
    >
      {data.handles.map((h) => (
        <Handle key={h.id} type={h.type} position={h.position} id={h.id} style={handleStyle} />
      ))}

      <div className="flex items-center gap-2">
        <span
          className={
            "flex size-6 shrink-0 items-center justify-center rounded-[6px] " +
            (data.tone === "dark"
              ? "bg-white/10 text-white"
              : "border border-gray-200 bg-[#FAFAFA] text-gray-700")
          }
        >
          {data.icon}
        </span>
        <p className="truncate text-[10.5px] font-medium uppercase tracking-[0.08em] text-gray-400">
          {data.eyebrow}
        </p>
      </div>
      <p
        className={
          "mt-2 text-[13px] font-medium leading-snug " +
          (data.tone === "dark" ? "text-white" : "text-gray-900")
        }
      >
        {data.title}
      </p>

      {data.badge && (
        <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-gray-900 ring-2 ring-white">
          <Check className="size-2.5 text-white" strokeWidth={3} />
        </span>
      )}
    </div>
  );
}

export const flowNodeTypes = { flowCard: FlowCard };

export const flowEdgeStyle = { stroke: "#D1D5DB", strokeWidth: 1.5 };
export const flowEdgeLabelStyle = { fill: "#6B7280", fontSize: 10, fontWeight: 500 };
export const flowEdgeLabelBgStyle = { fill: "#FFFFFF", stroke: "#E5E7EB" };
