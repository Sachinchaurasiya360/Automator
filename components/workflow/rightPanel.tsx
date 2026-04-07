import { Settings, ToolCase, MessageSquare, Logs, X } from "lucide-react";
import { useState } from "react";
type RightPanelProps = {
  onClose: () => void;
};

type Section = "properties" | "tools" | "chat" | "logs";

function ToolsSection() {
  return (
    <div className="flex justify-center items-center gap-10 list-none mt-2  ">
      <li className=" cursor-pointer"
      
      >Apps</li>
      <li className=" cursor-pointer">Ai</li>
      <li className=" cursor-pointer">Tools</li>
    </div>
  );
}

export function RightPanel({ onClose }: RightPanelProps) {
  const [activeSection, setActiveSection] = useState<Section>("properties");

  return (
    <div className="bg-white p-4 mt-2 border border-amber-100 rounded-2xl min-h-screen">
      <ul className="grid grid-cols-5 gap-2 list-none">
        <li
          className="flex items-center gap-1 hover:cursor-pointer"
          onClick={() => setActiveSection("properties")}
        >
          <Settings size={15} />
          Properties
        </li>
        <li
          className="flex items-center gap-1 hover:cursor-pointer"
          onClick={() => setActiveSection("tools")}
        >
          <ToolCase size={15} />
          Tools
        </li>
        <li
          className="flex items-center gap-1 hover:cursor-pointer"
          onClick={() => setActiveSection("chat")}
        >
          <MessageSquare size={15} />
          Chat
        </li>
        <li
          className="flex items-center gap-1 hover:cursor-pointer"
          onClick={() => setActiveSection("logs")}
        >
          <Logs size={15} />
          Logs
        </li>
        <li className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="cursor-pointer"
          >
            <X size={15} />
          </button>
        </li>
      </ul>
      <div className="w-fit min-h-0.5">
        {activeSection === "tools" && <ToolsSection />}
      </div>
    </div>
  );
}
