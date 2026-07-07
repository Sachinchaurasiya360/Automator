import Link from "next/link";

import { LogoMark, Wordmark } from "@/components/marketing/logo-mark";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Workflow Builder", href: "#builder" },
      { label: "Templates", href: "#templates" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "Google Workspace", href: "#integrations" },
      { label: "Slack", href: "#integrations" },
      { label: "Notion", href: "#integrations" },
      { label: "Webhooks & API", href: "#integrations" },
      { label: "View all", href: "#integrations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs" },
      { label: "Community", href: "/community" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark />
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-[220px] text-[13.5px] leading-relaxed text-gray-500">
              Automate work across every tool your team uses.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[13px] font-semibold text-gray-900">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-gray-400">
            &copy; {new Date().getFullYear()} Automator, Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[13px] text-gray-400 transition-colors hover:text-gray-900"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-gray-400 transition-colors hover:text-gray-900"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
