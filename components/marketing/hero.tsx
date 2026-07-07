"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
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
import { ArrowRight, GitBranch, Mail, MoreHorizontal, Play, Sheet, Slack } from "lucide-react";

import { Button } from "@/components/ui/button";
import { flowEdgeStyle, flowNodeTypes, type FlowCardNode } from "@/components/marketing/flow-node";

const initialNodes: FlowCardNode[] = [
  {
    id: "trigger",
    type: "flowCard",
    position: { x: 10, y: 30 },
    data: {
      icon: <Mail className="size-3.5" />,
      eyebrow: "Gmail · Trigger",
      title: "New email received",
      tone: "light",
      handles: [{ type: "source", position: Position.Bottom, id: "bottom" }],
    },
  },
  {
    id: "condition",
    type: "flowCard",
    position: { x: 230, y: 150 },
    data: {
      icon: <GitBranch className="size-3.5" />,
      eyebrow: "Condition",
      title: 'Subject has "Invoice"',
      tone: "dark",
      handles: [
        { type: "target", position: Position.Top, id: "top" },
        { type: "source", position: Position.Right, id: "right" },
      ],
    },
  },
  {
    id: "actionA",
    type: "flowCard",
    position: { x: 460, y: 10 },
    data: {
      icon: <Sheet className="size-3.5" />,
      eyebrow: "Google Sheets · Action",
      title: "Add row to sheet",
      tone: "light",
      badge: true,
      handles: [{ type: "target", position: Position.Left, id: "left" }],
    },
  },
  {
    id: "actionB",
    type: "flowCard",
    position: { x: 460, y: 250 },
    data: {
      icon: <Slack className="size-3.5" />,
      eyebrow: "Slack · Action",
      title: "Notify #finance",
      tone: "light",
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
    id: "e-condition-a",
    source: "condition",
    sourceHandle: "right",
    target: "actionA",
    targetHandle: "left",
    style: flowEdgeStyle,
  },
  {
    id: "e-condition-b",
    source: "condition",
    sourceHandle: "right",
    target: "actionB",
    targetHandle: "left",
    style: flowEdgeStyle,
  },
];

export function Hero() {
  const [nodes, setNodes] = useState<FlowCardNode[]>(initialNodes);

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowCardNode>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-28">
        {/* Copy */}
        <div>
          <h1 className="max-w-xl text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.02em] text-gray-900 sm:text-6xl">
            Turn busywork into workflows that run themselves.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
            Connect Google Docs, Slack, Notion, Gmail, and hundreds of other
            tools into automated workflows on a visual canvas. No code, no
            engineering backlog — just results.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              className="h-12 rounded-[10px] bg-gray-900 px-6 text-[15px] font-medium text-white hover:bg-gray-800"
            >
              <Link href="/auth/login">
                Get Started
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-[10px] border-gray-200 bg-white px-6 text-[15px] font-medium text-gray-900 hover:bg-[#FAFAFA]"
            >
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>

          <p className="mt-5 text-[13px] text-gray-500">
            Free forever plan &middot; No credit card required
          </p>
        </div>

        {/* Workflow canvas mockup */}
        <div className="relative">
          <div className="rounded-[16px] border border-gray-200 bg-white p-3">
            {/* toolbar */}
            <div className="flex items-center justify-between border-b border-gray-100 px-2 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-2 items-center justify-center">
                  <span className="absolute size-2 animate-pulse rounded-full bg-gray-900" />
                </span>
                <span className="text-[13px] font-medium text-gray-900">
                  Invoice Router
                </span>
                <span className="rounded-full border border-gray-200 bg-[#FAFAFA] px-2 py-0.5 text-[11px] font-medium text-gray-500">
                  Active
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="flex size-6 items-center justify-center rounded-[6px] border border-gray-200">
                  <Play className="size-3" fill="currentColor" />
                </span>
                <span className="flex size-6 items-center justify-center rounded-[6px]">
                  <MoreHorizontal className="size-3.5" />
                </span>
              </div>
            </div>

            {/* canvas */}
            <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-gray-100">
              <ReactFlow
                nodes={nodes}
                edges={initialEdges}
                onNodesChange={onNodesChange}
                nodeTypes={flowNodeTypes}
                fitView
                fitViewOptions={{ padding: 0.25 }}
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
                  gap={18}
                  size={1}
                  color="#D1D5DB"
                  bgColor="#FAFAFA"
                />
              </ReactFlow>
            </div>

            <p className="mt-3 text-center text-[11px] text-gray-400">
              Drag the nodes to rearrange the workflow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
