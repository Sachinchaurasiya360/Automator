import {
  Box,
  Braces,
  Database,
  FileText,
  Figma,
  Github,
  Kanban,
  Mail,
  MessageSquare,
  Notebook,
  Server,
  Sheet,
  Slack,
  Table2,
  Trello,
  Webhook,
} from "lucide-react";

const integrations = [
  { name: "Google Docs", icon: FileText },
  { name: "Google Sheets", icon: Sheet },
  { name: "Gmail", icon: Mail },
  { name: "Notion", icon: Notebook },
  { name: "Slack", icon: Slack },
  { name: "Discord", icon: MessageSquare },
  { name: "Airtable", icon: Table2 },
  { name: "GitHub", icon: Github },
  { name: "PostgreSQL", icon: Database },
  { name: "MySQL", icon: Server },
  { name: "Webhooks", icon: Webhook },
  { name: "HTTP API", icon: Braces },
  { name: "Dropbox", icon: Box },
  { name: "Trello", icon: Trello },
  { name: "Jira", icon: Kanban },
  { name: "Figma", icon: Figma },
];

export function Integrations() {
  return (
    <section id="integrations" className="border-b border-gray-200 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Integrations
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
            Connect the tools your team already uses
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Automator speaks the same language as your existing stack. Pick
            an app, drop it on the canvas, and start building.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-gray-200 bg-gray-200 sm:grid-cols-4 lg:grid-cols-8">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col items-center justify-center gap-3 bg-white px-4 py-8 text-center transition-colors hover:bg-[#FAFAFA]"
            >
              <span className="flex size-11 items-center justify-center rounded-[10px] border border-gray-200 bg-[#FAFAFA] text-gray-900 transition-colors group-hover:border-gray-300 group-hover:bg-white">
                <item.icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-[13px] font-medium text-gray-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
