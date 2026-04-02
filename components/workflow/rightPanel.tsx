
export function RightPanel() {
  return (
    <div className="bg-white p-4 mt-2 border border-amber-100 rounded-2xl min-h-screen">
      <div className="grid grid-cols-5 gap-4 list-none">
        <li className="hover:cursor-pointer">Properties</li>
        <li className="hover:cursor-pointer">Tools</li>
        <li className="hover:cursor-pointer">Chat</li>
        <li className="hover:cursor-pointer">Logs</li>
        <li className="hover:cursor-pointer">✕</li>
      </div>
      <div className="bg-black w-fit min-h-0.5"></div>
      <div className="grid grid-cols-3 p-4 list-none">
        <li className="w-full cursor-pointer">Apps</li>
        <li className="w-full cursor-pointer">Ai</li>
        <li className="w-full cursor-pointer">Tools</li>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
