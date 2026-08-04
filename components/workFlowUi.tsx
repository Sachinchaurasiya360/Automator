"use client";
import { useCallback, useRef, useState } from "react";
import type React from "react";
import { ChevronLeft, Loader2, Play } from "lucide-react";
import { RightPanel, type WorkflowLog } from "./workflow/rightPanel";
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
type RightPanelSection = "properties" | "tools" | "chat" | "logs";

const nodeTypes = { workflow: WorkflowNode };

const initialNodes: FlowNode[] = [
  {
    id: "n1",
    type: "workflow",
    position: { x: 20, y: 80 },
    data: {
      label: "Webhook Trigger",
      kind: "Webhook Trigger",
      desc: "Start when a request arrives",
      status: "idle",
      enabled: true,
      config: {
        samplePayload: '{"url":"https://example.com","topic":"summarize this page"}',
      },
    },
  },
  {
    id: "n2",
    type: "workflow",
    position: { x: 320, y: 80 },
    data: {
      label: "Web Scraper",
      kind: "Web Scraper",
      desc: "Extract content from a web page",
      status: "idle",
      enabled: true,
      config: {
        url: "https://example.com",
      },
    },
  },
  {
    id: "n3",
    type: "workflow",
    position: { x: 620, y: 80 },
    data: {
      label: "Chatbot",
      kind: "Chatbot",
      desc: "Summarize and answer using scraped content",
      status: "idle",
      enabled: true,
      config: {
        model: "inclusionai/ling-3.0-flash:free",
        maxTokens: "256",
        prompt: "Summarize the scraped page content in 5 bullet points.",
      },
    },
  },
  {
    id: "n4",
    type: "workflow",
    position: { x: 920, y: 80 },
    data: {
      label: "Send Email",
      kind: "Send Email",
      desc: "Email the chatbot response",
      status: "idle",
      enabled: true,
      config: {
        to: "",
        subject: "Workflow result",
        body: "{{last}}",
      },
    },
  },
];

const initialEdges: FlowEdge[] = [
  { id: "n1-n2", source: "n1", target: "n2", animated: true },
  { id: "n2-n3", source: "n2", target: "n3", animated: true },
  { id: "n3-n4", source: "n3", target: "n4", animated: true },
];

const currentTime = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

function getExecutionOrder(nodes: FlowNode[], edges: FlowEdge[]) {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const indegree = new Map(nodes.map((node) => [node.id, 0]));
  const outgoing = new Map(nodes.map((node) => [node.id, [] as string[]]));

  for (const edge of edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) continue;
    outgoing.get(edge.source)?.push(edge.target);
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1);
  }

  const queue = nodes
    .filter((node) => (indegree.get(node.id) ?? 0) === 0)
    .map((node) => node.id);
  const orderedIds: string[] = [];

  while (queue.length > 0) {
    const id = queue.shift();
    if (!id) continue;
    orderedIds.push(id);

    for (const target of outgoing.get(id) ?? []) {
      const next = (indegree.get(target) ?? 0) - 1;
      indegree.set(target, next);
      if (next === 0) queue.push(target);
    }
  }

  const remainingIds = nodes
    .map((node) => node.id)
    .filter((id) => !orderedIds.includes(id));

  return [...orderedIds, ...remainingIds];
}

function Flow() {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<FlowEdge[]>(initialEdges);
  const [showRightPanel, setshowRightPanel] = useState(true);
  const [rightPanelSection, setRightPanelSection] =
    useState<RightPanelSection>("tools");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initialNodes[0]?.id ?? null,
  );
  const [logs, setLogs] = useState<WorkflowLog[]>([]);
  const idRef = useRef(initialNodes.length);
  const { screenToFlowPosition } = useReactFlow();
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  const addLog = useCallback((level: WorkflowLog["level"], msg: string) => {
    setLogs((prev) => [...prev, { level, msg, time: currentTime() }]);
  }, []);

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
          enabled: true,
          config: {},
        },
      };
    },
    [],
  );

  const onAddNode = useCallback(
    (name: string) => {
      const panelOffset = showRightPanel ? 400 : 0;
      const position = screenToFlowPosition({
        x: (window.innerWidth - panelOffset) / 2 + (idRef.current % 4) * 24,
        y: window.innerHeight / 2 + (idRef.current % 4) * 24,
      });
      const node = createNode(name, position);
      setSelectedNodeId(node.id);
      setRightPanelSection("properties");
      setNodes((prev) => [...prev, node]);
    },
    [createNode, screenToFlowPosition, showRightPanel],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const name = event.dataTransfer.getData("application/reactflow");
      if (!name) return;
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const node = createNode(name, position);
      setSelectedNodeId(node.id);
      setRightPanelSection("properties");
      setNodes((prev) => [...prev, node]);
    },
    [createNode, screenToFlowPosition],
  );

  const updateNodeData = useCallback(
    (id: string, data: Partial<FlowNode["data"]>) =>
      setNodes((prev) =>
        prev.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node,
        ),
      ),
    [],
  );

  const runWorkflow = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setshowRightPanel(true);
    setRightPanelSection("logs");
    const order = getExecutionOrder(nodes, edges);

    setLogs([{ level: "info", msg: "Workflow sent to server", time: currentTime() }]);
    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        data: {
          ...node.data,
          status: order.includes(node.id) ? "running" : "idle",
        },
      })),
    );

    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error ?? "Workflow execution failed");
      }

      setLogs(result.logs ?? []);
      setNodes((prev) =>
        prev.map((node) => {
          const step = result.steps?.find(
            (item: { id: string; status: FlowNode["data"]["status"] }) =>
              item.id === node.id,
          );
          return step
            ? { ...node, data: { ...node.data, status: step.status } }
            : node;
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Workflow execution failed";
      addLog("error", message);
      setNodes((prev) =>
        prev.map((node) =>
          order.includes(node.id)
            ? { ...node, data: { ...node.data, status: "error" } }
            : node,
        ),
      );
    } finally {
      setIsRunning(false);
    }
  }, [addLog, edges, isRunning, nodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          setshowRightPanel(true);
          setRightPanelSection("properties");
        }}
        onPaneClick={() => setSelectedNodeId(null)}
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
                Running...
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
              selectedNode={selectedNode}
              onUpdateNode={updateNodeData}
              logs={logs}
              activeSection={rightPanelSection}
              onSectionChange={setRightPanelSection}
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
