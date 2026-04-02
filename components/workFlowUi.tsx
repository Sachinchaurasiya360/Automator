"use client";
import { useState, useCallback } from "react";
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
          <RightPanel />
        </Panel>

        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
