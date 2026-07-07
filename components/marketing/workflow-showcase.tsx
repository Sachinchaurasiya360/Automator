"use client";

import { useCallback, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Position,
  ReactFlow,
  applyNodeChanges,
  type Edge,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  CheckCircle2,
  GitBranch,
  LayoutGrid,
  Notebook,
  Puzzle,
  Settings,
  Slack,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import {
  flowEdgeLabelBgStyle,
  flowEdgeLabelStyle,
  flowEdgeStyle,
  flowNodeTypes,
  type FlowCardNode,
} from "@/components/marketing/flow-node";

const initialNodes: FlowCardNode[] = [
  {
    id: "trigger",
    type: "flowCard",
    position: { x: 20, y: 60 },
    data: {
      icon: <Webhook className="size-3.5" />,
      eyebrow: "Trigger",
      title: "Webhook received",
      tone: "light",
      handles: [{ type: "source", position: Position.Bottom, id: "bottom" }],
    },
  },
  {
    id: "condition",
    type: "flowCard",
    position: { x: 280, y: 190 },
    data: {
      icon: <GitBranch className="size-3.5" />,
      eyebrow: "Condition",
      title: "If priority = High",
      tone: "dark",
      handles: [
        { type: "target", position: Position.Top, id: "top" },
        { type: "source", position: Position.Right, id: "right" },
      ],
    },
  },
  {
    id: "actionYes",
    type: "flowCard",
    position: { x: 540, y: 20 },
    data: {
      icon: <Slack className="size-3.5" />,
      eyebrow: "Action",
      title: "Notify #sales-urgent",
      tone: "light",
      handles: [
        { type: "target", position: Position.Left, id: "left" },
        { type: "source", position: Position.Right, id: "right" },
      ],
    },
  },
  {
    id: "actionNo",
    type: "flowCard",
    position: { x: 540, y: 320 },
    data: {
      icon: <Notebook className="size-3.5" />,
      eyebrow: "Action",
      title: "Add to Notion backlog",
      tone: "light",
      handles: [
        { type: "target", position: Position.Left, id: "left" },
        { type: "source", position: Position.Right, id: "right" },
      ],
    },
  },
  {
    id: "success",
    type: "flowCard",
    position: { x: 800, y: 170 },
    data: {
      icon: <CheckCircle2 className="size-3.5" />,
      eyebrow: "Success",
      title: "Workflow complete",
      tone: "dark",
      badge: true,
      handles: [{ type: "target", position: Position.Left, id: "left" }],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-trigger-condition",
    source: "trigger",
    sourceHandle: "bottom",
    target: "condition",
    targetHandle: "top",
    style: flowEdgeStyle,
  },
  {
    id: "e-condition-yes",
    source: "condition",
    sourceHandle: "right",
    target: "actionYes",
    targetHandle: "left",
    label: "Yes",
    style: flowEdgeStyle,
    labelStyle: flowEdgeLabelStyle,
    labelBgStyle: flowEdgeLabelBgStyle,
    labelBgPadding: [6, 3],
    labelBgBorderRadius: 8,
  },
  {
    id: "e-condition-no",
    source: "condition",
    sourceHandle: "right",
    target: "actionNo",
    targetHandle: "left",
    label: "No",
    style: flowEdgeStyle,
    labelStyle: flowEdgeLabelStyle,
    labelBgStyle: flowEdgeLabelBgStyle,
    labelBgPadding: [6, 3],
    labelBgBorderRadius: 8,
  },
  {
    id: "e-yes-success",
    source: "actionYes",
    sourceHandle: "right",
    target: "success",
    targetHandle: "left",
    style: flowEdgeStyle,
  },
  {
    id: "e-no-success",
    source: "actionNo",
    sourceHandle: "right",
    target: "success",
    targetHandle: "left",
    style: flowEdgeStyle,
  },
];

const railIcons = [
  { icon: Workflow, active: true },
  { icon: Puzzle, active: false },
  { icon: LayoutGrid, active: false },
  { icon: Users, active: false },
  { icon: Settings, active: false },
];

export function WorkflowShowcase() {
  const [nodes, setNodes] = useState<FlowCardNode[]>(initialNodes);

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowCardNode>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return (
    <section id="builder" className="border-b border-gray-200 bg-[#FAFAFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            The builder
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
            A canvas built for real workflows
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Wire together triggers, conditions, and actions. Drag any node to
            rearrange the graph and watch every connection follow along.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[16px] border border-gray-200 bg-white">
          <div className="flex">
            {/* icon rail */}
            <div className="hidden w-16 shrink-0 flex-col items-center gap-3 border-r border-gray-100 bg-[#FAFAFA] py-5 sm:flex">
              {railIcons.map(({ icon: Icon, active }, i) => (
                <span
                  key={i}
                  className={
                    "flex size-9 items-center justify-center rounded-[8px] " +
                    (active ? "bg-gray-900 text-white" : "text-gray-400")
                  }
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
              ))}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              {/* top bar */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                  <p className="text-[11px] text-gray-400">
                    Workflows / Lead Routing
                  </p>
                  <p className="mt-0.5 text-[14px] font-semibold text-gray-900">
                    Lead Routing Automation
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-1.5 rounded-full border border-gray-200 bg-[#FAFAFA] px-2.5 py-1 text-[11px] font-medium text-gray-500 sm:flex">
                    <span className="size-1.5 rounded-full bg-gray-900" />
                    Published
                  </span>
                  <span className="rounded-[8px] bg-gray-900 px-3 py-1.5 text-[12.5px] font-medium text-white">
                    Publish
                  </span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* canvas */}
                <div className="relative h-[420px] w-full sm:h-[460px]">
                  <ReactFlow
                    nodes={nodes}
                    edges={initialEdges}
                    onNodesChange={onNodesChange}
                    nodeTypes={flowNodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    nodesConnectable={false}
                    elementsSelectable={false}
                    panOnDrag={false}
                    panOnScroll={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    preventScrolling={false}
                    proOptions={{ hideAttribution: true }}
                  >
                    <Background
                      variant={BackgroundVariant.Dots}
                      gap={20}
                      size={1}
                      color="#D1D5DB"
                      bgColor="#FAFAFA"
                    />
                  </ReactFlow>
                </div>

                {/* inspector panel */}
                <div className="w-full shrink-0 border-t border-gray-100 bg-white p-5 lg:w-72 lg:border-l lg:border-t-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                    Node settings
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-gray-900">
                    Notify #sales-urgent
                  </p>

                  <div className="mt-5">
                    <label className="text-[12px] font-medium text-gray-500">
                      Channel
                    </label>
                    <div className="mt-1.5 rounded-[8px] border border-gray-200 bg-[#FAFAFA] px-3 py-2 text-[13px] text-gray-700">
                      #sales-urgent
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-[12px] font-medium text-gray-500">
                      Message
                    </label>
                    <div className="mt-1.5 rounded-[8px] border border-gray-200 bg-[#FAFAFA] px-3 py-2 text-[13px] leading-relaxed text-gray-700">
                      New high priority lead: {"{{lead.name}}"} just came in.
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-[13px] font-medium text-gray-700">
                      Notify on failure
                    </span>
                    <span className="relative inline-flex h-5 w-9 shrink-0 rounded-full bg-gray-900">
                      <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
