"use client";
import { useState, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { RightPanel } from "./workflow/rightPanel";
import {
  ReactFlow,
  applyNodeChanges,
  Controls,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Panel,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type FlowNode = Node<{ label: string }>;
type FlowEdge = Edge;

const initialNodes: FlowNode[] = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Research Node " } },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Google Doc node " } },
];
const initialEdges: FlowEdge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function WorkFlowUi() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);
  const [showRightPanel,setshowRightPanel]=useState(true)

  const onNodesChange = useCallback(
    (changes: NodeChange<FlowNode>[]) =>
      setNodes((nodesSnapshot) =>
        applyNodeChanges<FlowNode>(changes, nodesSnapshot),
      ),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<FlowEdge>[]) =>
      setEdges((edgesSnapshot) =>
        applyEdgeChanges<FlowEdge>(changes, edgesSnapshot),
      ),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap pannable zoomable />
        <Panel position="top-right" className="nopan nowheel">
          {showRightPanel ? (
            <RightPanel onClose={() => setshowRightPanel(false)} />
          ) : (
            <div
              role="button"
              tabIndex={0}
              aria-label="Open right panel"
              onClick={() => setshowRightPanel(true)}
              className="flex items-center gap-1 rounded-full border border-amber-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-amber-50"
            >
              <ChevronLeft size={14} />
              <span>Show panel</span>
            </div>
          )}
        </Panel>

        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
