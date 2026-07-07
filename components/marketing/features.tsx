import {
  GitBranch,
  LayoutGrid,
  Puzzle,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Visual Workflow Builder",
    description:
      "Drag, drop, and connect nodes on an infinite canvas. See exactly how data moves through every automation you build.",
  },
  {
    icon: Puzzle,
    title: "Hundreds of Integrations",
    description:
      "Connect Google Docs, Notion, Slack, Gmail, databases, and hundreds of other apps without writing a single line of code.",
  },
  {
    icon: Zap,
    title: "Instant Triggers",
    description:
      "Kick off workflows the moment something happens — a new row, an incoming email, a form submission, or a webhook call.",
  },
  {
    icon: GitBranch,
    title: "Powerful Conditions",
    description:
      "Branch logic based on any field or value. Route work down the right path automatically, every single time.",
  },
  {
    icon: ShieldCheck,
    title: "Error Handling",
    description:
      "Catch failures before they cascade. Configure retries, fallback paths, and alerts so nothing fails silently.",
  },
  {
    icon: LayoutGrid,
    title: "Reusable Templates",
    description:
      "Start from a proven workflow instead of a blank canvas, then customize it to fit exactly how your team operates.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-gray-200 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
            Everything you need to automate work
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            A complete toolkit for building reliable automations — from the
            first trigger to the last action, and everything in between.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white p-8 transition-colors hover:bg-[#FAFAFA]"
            >
              <span className="flex size-11 items-center justify-center rounded-[10px] border border-gray-200 bg-[#FAFAFA] text-gray-900">
                <feature.icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
