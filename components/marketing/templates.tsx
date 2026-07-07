import {
  ArrowRight,
  Box,
  Database,
  FileText,
  Github,
  Mail,
  MessageSquare,
  Notebook,
  Repeat,
  Sheet,
  Slack,
  Users,
} from "lucide-react";

const templates = [
  {
    category: "Productivity",
    from: FileText,
    to: Notebook,
    title: "New Form → Notion",
    description:
      "Every new form response is logged as a structured page in your Notion database, tagged and ready to review.",
    uses: "3.4k uses",
  },
  {
    category: "Alerts",
    from: Mail,
    to: Slack,
    title: "Gmail → Slack Alert",
    description:
      "Flag important emails the moment they land and post a formatted alert straight to the right Slack channel.",
    uses: "5.1k uses",
  },
  {
    category: "Finance",
    from: FileText,
    to: Sheet,
    title: "Invoice → Google Sheets",
    description:
      "Extract line items from incoming invoices and append them to a running Google Sheet for your finance team.",
    uses: "2.2k uses",
  },
  {
    category: "DevOps",
    from: Github,
    to: MessageSquare,
    title: "GitHub → Discord",
    description:
      "Post pull requests, releases, and CI failures to a Discord channel your engineering team already watches.",
    uses: "1.8k uses",
  },
  {
    category: "Data",
    from: Database,
    to: Box,
    title: "Database Backup",
    description:
      "Run a scheduled export of production tables and archive the snapshot to cloud storage automatically.",
    uses: "1.1k uses",
  },
  {
    category: "Sales",
    from: Users,
    to: Database,
    title: "CRM Sync",
    description:
      "Keep two systems of record in sync — every contact update mirrors across your CRM and internal database.",
    uses: "2.7k uses",
    sync: true,
  },
];

export function Templates() {
  return (
    <section id="templates" className="border-b border-gray-200 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Templates
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
            Start from a proven workflow
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Skip the blank canvas. Clone a template built by other teams and
            adjust it to match how your team actually works.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.title}
              className="group flex flex-col rounded-[14px] border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-[8px] border border-gray-200 bg-[#FAFAFA] text-gray-900">
                    <template.from className="size-4" strokeWidth={1.75} />
                  </span>
                  {template.sync ? (
                    <Repeat className="size-3.5 text-gray-300" />
                  ) : (
                    <ArrowRight className="size-3.5 text-gray-300" />
                  )}
                  <span className="flex size-9 items-center justify-center rounded-[8px] border border-gray-200 bg-[#FAFAFA] text-gray-900">
                    <template.to className="size-4" strokeWidth={1.75} />
                  </span>
                </div>
                <span className="rounded-full border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-gray-500">
                  {template.category}
                </span>
              </div>

              <h3 className="mt-5 text-[16px] font-semibold text-gray-900">
                {template.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-gray-600">
                {template.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-[12px] text-gray-400">
                  {template.uses}
                </span>
                <span className="flex items-center gap-1 text-[13px] font-medium text-gray-900">
                  Use template
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
