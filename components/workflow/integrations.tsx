import { Globe, Code2, Filter, Box } from "lucide-react";

// ── Brand SVG logos ───────────────────────────────────────────────
export function GoogleSheetsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <rect width="24" height="24" rx="3" fill="#0F9D58" />
      <rect x="5" y="7" width="14" height="1.8" rx="0.4" fill="white" />
      <rect x="5" y="11.1" width="14" height="1.8" rx="0.4" fill="white" />
      <rect x="5" y="15.2" width="14" height="1.8" rx="0.4" fill="white" />
      <rect x="9.6" y="7" width="1.8" height="10" rx="0.4" fill="white" />
    </svg>
  );
}

export function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path d="M5.8 14.4a2 2 0 1 1-2-2h2v2Z" fill="#E01E5A" />
      <path d="M6.8 14.4a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0v-5Z" fill="#E01E5A" />
      <path d="M9.6 5.8a2 2 0 1 1 2-2v2H9.6Z" fill="#36C5F0" />
      <path d="M9.6 6.8a2 2 0 0 1 0 4H4.6a2 2 0 0 1 0-4h5Z" fill="#36C5F0" />
      <path d="M18.2 9.6a2 2 0 1 1 2 2h-2V9.6Z" fill="#2EB67D" />
      <path d="M17.2 9.6a2 2 0 0 1-4 0V4.6a2 2 0 0 1 4 0v5Z" fill="#2EB67D" />
      <path d="M14.4 18.2a2 2 0 1 1-2 2v-2h2Z" fill="#ECB22E" />
      <path d="M14.4 17.2a2 2 0 0 1 0-4h5a2 2 0 0 1 0 4h-5Z" fill="#ECB22E" />
    </svg>
  );
}

export function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <rect width="24" height="24" rx="4" fill="white" stroke="#E5E7EB" />
      <path
        d="M6 5.5h7.5l4 4.5V19H6V5.5Z"
        fill="white"
        stroke="#111827"
        strokeWidth="1.2"
      />
      <path d="M13.5 5.5V10H17.5" stroke="#111827" strokeWidth="1.2" fill="none" />
      <path d="M8.5 10.5h7M8.5 13h7M8.5 15.5h5" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M22.28 9.98a5.47 5.47 0 0 0-.47-4.49 5.53 5.53 0 0 0-5.95-2.65A5.47 5.47 0 0 0 11.74 1a5.53 5.53 0 0 0-5.27 3.83 5.47 5.47 0 0 0-3.66 2.65 5.53 5.53 0 0 0 .68 6.48 5.47 5.47 0 0 0 .47 4.49 5.53 5.53 0 0 0 5.95 2.65A5.47 5.47 0 0 0 12.26 23a5.53 5.53 0 0 0 5.27-3.83 5.47 5.47 0 0 0 3.66-2.65 5.53 5.53 0 0 0-.91-6.54ZM12.26 21.5a4.1 4.1 0 0 1-2.62-.95l.13-.07 4.35-2.51a.72.72 0 0 0 .36-.62v-6.14l1.84 1.06a.07.07 0 0 1 .04.05v5.08a4.12 4.12 0 0 1-4.1 4.1Zm-8.83-3.77a4.08 4.08 0 0 1-.49-2.75l.13.08 4.35 2.51a.71.71 0 0 0 .72 0l5.31-3.07v2.12a.07.07 0 0 1-.03.06L8.97 19.2a4.12 4.12 0 0 1-5.54-1.47ZM2.9 8.27a4.1 4.1 0 0 1 2.13-1.8v5.16a.71.71 0 0 0 .36.62l5.3 3.06-1.83 1.06a.07.07 0 0 1-.07 0L4.1 13.9A4.12 4.12 0 0 1 2.9 8.27Zm15.1 3.53-5.31-3.08 1.83-1.06a.07.07 0 0 1 .07 0l4.69 2.71a4.12 4.12 0 0 1-.64 7.43v-5.38a.72.72 0 0 0-.64-.62Zm1.83-2.77-.13-.08-4.34-2.52a.71.71 0 0 0-.72 0L9.33 9.5V7.38a.07.07 0 0 1 .03-.06l4.69-2.7a4.12 4.12 0 0 1 5.78 4.21ZM8.39 12.85 6.55 11.8a.07.07 0 0 1-.04-.05V6.67a4.12 4.12 0 0 1 6.75-3.16l-.13.08-4.35 2.51a.72.72 0 0 0-.36.62l-.03 6.13Zm1-2.16 2.36-1.36 2.37 1.37v2.72l-2.36 1.37-2.37-1.37V10.69Z" />
    </svg>
  );
}

export function GeminiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <path
        d="M12 2C12 2 13.5 8.5 18 10.5C13.5 12.5 12 19 12 19C12 19 10.5 12.5 6 10.5C10.5 8.5 12 2 12 2Z"
        fill="url(#gem-grad)"
      />
      <defs>
        <linearGradient id="gem-grad" x1="6" y1="2" x2="18" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ClaudeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <rect width="24" height="24" rx="6" fill="#D97757" />
      <path
        d="M8.5 16.5L12 7.5L15.5 16.5M9.8 13.5H14.2"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type IntegrationTab = "apps" | "ai" | "tools";

export type Integration = {
  name: string;
  desc: string;
  icon: React.ReactNode;
  /** Tailwind classes for the icon chip background inside a node. */
  accent: string;
};

export const INTEGRATIONS: Record<IntegrationTab, Integration[]> = {
  apps: [
    { name: "Google Sheets", desc: "Read and write spreadsheet data", icon: <GoogleSheetsIcon />, accent: "bg-emerald-50" },
    { name: "Slack", desc: "Send messages and notifications", icon: <SlackIcon />, accent: "bg-rose-50" },
    { name: "Notion", desc: "Create and update pages", icon: <NotionIcon />, accent: "bg-gray-50" },
  ],
  ai: [
    { name: "GPT-4o", desc: "OpenAI text generation", icon: <OpenAIIcon />, accent: "bg-gray-50" },
    { name: "Gemini", desc: "Google AI generation", icon: <GeminiIcon />, accent: "bg-indigo-50" },
    { name: "Claude", desc: "Anthropic text generation", icon: <ClaudeIcon />, accent: "bg-orange-50" },
  ],
  tools: [
    { name: "HTTP Request", desc: "Make API calls", icon: <Globe size={14} />, accent: "bg-sky-50" },
    { name: "Code", desc: "Run JavaScript snippets", icon: <Code2 size={14} />, accent: "bg-violet-50" },
    { name: "Filter", desc: "Conditionally route data", icon: <Filter size={14} />, accent: "bg-amber-50" },
  ],
};

const INTEGRATION_BY_NAME: Record<string, Integration> = Object.fromEntries(
  Object.values(INTEGRATIONS)
    .flat()
    .map((item) => [item.name, item]),
);

/** Resolve an integration definition by its name; falls back to a generic icon. */
export function getIntegration(name: string): Integration {
  return (
    INTEGRATION_BY_NAME[name] ?? {
      name,
      desc: "Workflow step",
      icon: <Box size={14} />,
      accent: "bg-gray-50",
    }
  );
}
