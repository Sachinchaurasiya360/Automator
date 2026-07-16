"use client";
import { useState, useCallback, useRef } from "react";
import { ChevronLeft, Play, Loader2 } from "lucide-react";
import { RightPanel } from "./workflow/rightPanel";
import {
  WorkflowNode,
  type WorkflowNodeType,
} from "./workflow/workflowNode";
import { getIntegration } from "./workflow/integrations";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
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
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type FlowNode = WorkflowNodeType;
type FlowEdge = Edge;

const nodeTypes = { workflow: WorkflowNode };

const initialNodes: FlowNode[] = [
  {
    id: "n1",
    type: "workflow",
    position: { x: 40, y: 40 },
    data: { label: "Research Node", desc: "Gather source material", status: "idle" },
  },
  {
    id: "n2",
    type: "workflow",
    position: { x: 40, y: 200 },
    data: { label: "Google Doc node", desc: "Write results to a doc", status: "idle" },
  },
];
const initialEdges: FlowEdge[] = [
  { id: "n1-n2", source: "n1", target: "n2", animated: true },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function Flow() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);
  const [showRightPanel, setshowRightPanel] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const idRef = useRef(0);
  const { screenToFlowPosition } = useReactFlow();

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
      setEdges((edgesSnapshot) =>
        addEdge({ ...params, animated: true }, edgesSnapshot),
      ),
    [],
  );

  const createNode = useCallback(
    (name: string, position: { x: number; y: number }): FlowNode => {
      const integration = getIntegration(name);
      idRef.current += 1;
      return {
        id: `node-${idRef.current}-${name}`,
        type: "workflow",
        position,
        data: {
          label: name,
          kind: name,
          desc: integration.desc,
          status: "idle",
        },
      };
    },
    [],
  );

  // Click an item in the panel → drop it into the visible canvas area.
  const onAddNode = useCallback(
    (name: string) => {
      const panelOffset = showRightPanel ? 400 : 0;
      const position = screenToFlowPosition({
        x: (window.innerWidth - panelOffset) / 2 + (idRef.current % 4) * 24,
        y: window.innerHeight / 2 + (idRef.current % 4) * 24,
      });
      setNodes((prev) => [...prev, createNode(name, position)]);
    },
    [createNode, screenToFlowPosition, showRightPanel],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Drag an item from the panel and drop it exactly where the cursor lands.
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const name = event.dataTransfer.getData("application/reactflow");
      if (!name) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setNodes((prev) => [...prev, createNode(name, position)]);
    },
    [createNode, screenToFlowPosition],
  );

  const setStatus = useCallback(
    (id: string, status: FlowNode["data"]["status"]) =>
      setNodes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, status } } : n,
        ),
      ),
    [],
  );

  // Run the workflow: walk nodes in order, marking each running → done.
  const runWorkflow = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    const order = nodes.map((n) => n.id);
    setNodes((prev) =>
      prev.map((n) => ({ ...n, data: { ...n.data, status: "idle" } })),
    );
    await sleep(200);
    for (const id of order) {
      setStatus(id, "running");
      await sleep(750);
      setStatus(id, "done");
      await sleep(150);
    }
    setIsRunning(false);
  }, [isRunning, nodes, setStatus]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap pannable zoomable />

        <Panel position="top-left" className="nopan">
          <button
            type="button"
            onClick={runWorkflow}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isRunning ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Running…
              </>
            ) : (
              <>
                <Play size={14} className="fill-current" />
                Run
              </>
            )}
          </button>
        </Panel>

        <Panel position="top-right" className="nopan nowheel">
          {showRightPanel ? (
            <RightPanel
              onClose={() => setshowRightPanel(false)}
              onAddNode={onAddNode}
            />
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

export default function WorkFlowUi() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
