import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";

const features = [
  {
    index: "01",
    title: "Visual Canvas",
    description:
      "An infinite, snapping canvas. Drop nodes, draw connections, and let the structure of your work become visible.",
  },
  {
    index: "02",
    title: "Composable Nodes",
    description:
      "Triggers, transforms, conditions, and actions. Every node is a typed contract you can rearrange in seconds.",
  },
  {
    index: "03",
    title: "Live Execution",
    description:
      "Run workflows directly on the canvas. Watch data flow through edges in real time, pause, inspect, replay.",
  },
  {
    index: "04",
    title: "Versioned Forever",
    description:
      "Every drag, every edit, every connection — captured. Roll back to any moment without leaving the canvas.",
  },
  {
    index: "05",
    title: "Multiplayer",
    description:
      "Work shoulder to shoulder with your team. Cursors, selections, and edits resolve instantly across the world.",
  },
  {
    index: "06",
    title: "Extensible",
    description:
      "Bring your own nodes with a typed SDK. Integrate any service, expose any function, ship to your team in minutes.",
  },
];

const steps = [
  {
    n: "I",
    title: "Sketch",
    description:
      "Open a blank canvas. Drop the first node. There is no project to set up, no configuration to read.",
  },
  {
    n: "II",
    title: "Connect",
    description:
      "Draw an edge between nodes. The canvas understands types, validates contracts, and highlights what fits.",
  },
  {
    n: "III",
    title: "Run",
    description:
      "Press run. The graph executes, data appears beside each node, and your idea becomes a working system.",
  },
];

const stats = [
  { value: "10,482", label: "Builders" },
  { value: "527,914", label: "Nodes connected" },
  { value: "99.98%", label: "Uptime, last 90 days" },
  { value: "164", label: "Native integrations" },
];

export default function Home() {
  return (
    <div className="min-h-svh bg-[#f6f4ee] text-stone-900 [font-family:var(--font-sans)] selection:bg-stone-900 selection:text-[#f6f4ee]">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-stone-900/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="[font-family:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-stone-500">
              Visual workflow builder
            </p>
            <h1 className="mt-6 max-w-4xl [font-family:var(--font-display)] text-6xl font-light leading-[0.98] tracking-tight text-stone-900 sm:text-7xl lg:text-8xl">
              Build automations on a clean canvas.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone-600">
              Drag in triggers, connect actions, and run the workflow without
              losing sight of how everything fits together.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-none bg-stone-900 px-6 text-[13px] uppercase tracking-[0.18em] text-[#f6f4ee] hover:bg-stone-800"
              >
                <Link href="/auth/signup">
                  Get started
                  <ArrowRight className="ml-3 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-none border-stone-900/20 bg-transparent px-6 text-[13px] uppercase tracking-[0.18em] text-stone-900 hover:bg-stone-900/5"
              >
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </div>
          </div>

          <div className="border border-stone-900/15 bg-[#efece3] p-5">
            <div className="mb-5 flex items-center justify-between border-b border-stone-900/10 pb-4">
              <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                Example flow
              </p>
              <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                Live canvas
              </p>
            </div>

            <div className="space-y-3">
              {["New form response", "Check priority", "Send Slack update"].map(
                (label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 border border-stone-900/15 bg-[#f6f4ee] p-4"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center border border-stone-900/20 [font-family:var(--font-mono)] text-xs text-stone-500">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="[font-family:var(--font-display)] text-xl font-light tracking-tight text-stone-900">
                        {label}
                      </p>
                      <p className="mt-1 text-sm text-stone-500">
                        {index === 0
                          ? "Trigger"
                          : index === 1
                            ? "Condition"
                            : "Action"}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-6 border-t border-stone-900/10 pt-8 sm:grid-cols-3 lg:col-span-2">
            {["No code setup", "Visual debugging", "Reusable workflows"].map(
              (item) => (
                <p
                  key={item}
                  className="[font-family:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-stone-500"
                >
                  {item}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Hero — type specimen / architectural plate */}
      <section className="hidden">
        {/* faint blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative mx-auto max-w-[1500px] px-8 pt-12 pb-16">
          {/* type specimen header — letter-by-letter strip */}
          <div className="grid grid-cols-6 border-y-2 border-stone-900 [font-family:var(--font-display)] sm:grid-cols-12">
            {"AUTOMATOR".split("").map((ch, i) => (
              <div
                key={i}
                className={`flex h-20 items-center justify-center border-stone-900/20 text-3xl font-light text-stone-900 ${
                  i < 8 ? "border-r" : ""
                } ${i === 8 ? "border-r sm:border-r" : ""}`}
              >
                {ch}
              </div>
            ))}
            <div className="col-span-6 flex h-20 items-center justify-end border-l border-stone-900/20 px-4 sm:col-span-3">
              <span className="[font-family:var(--font-mono)] text-[10px] uppercase leading-tight tracking-[0.22em] text-stone-500">
                A type specimen
                <br />
                of a working tool
              </span>
            </div>
          </div>

          {/* the great rule */}
          <div className="mt-10 grid grid-cols-12 gap-x-8">
            <div className="col-span-12 lg:col-span-7">
              <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                Plate I — The Verb
              </p>
            </div>
            <div className="col-span-12 hidden items-center gap-3 lg:col-span-5 lg:flex">
              <span className="h-px flex-1 bg-stone-900/20" />
              <span className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                fig. 01
              </span>
            </div>
          </div>

          {/* hero typographic plate — headline + diagram side by side */}
          <div className="mt-6 grid grid-cols-12 gap-x-8 gap-y-12">
            {/* headline */}
            <div className="col-span-12 lg:col-span-7">
              <h1 className="[font-family:var(--font-display)] font-light tracking-[-0.045em] text-stone-900">
                <span className="block text-[18vw] leading-[0.82] sm:text-[16vw] lg:text-[12.5rem]">
                  Drag,
                </span>
                <span className="block pl-[12%] text-[18vw] leading-[0.82] sm:text-[16vw] lg:text-[12.5rem]">
                  drop,
                </span>
                <span className="block pl-[24%] text-[18vw] italic leading-[0.82] text-stone-600 sm:text-[16vw] lg:text-[12.5rem]">
                  ship.
                </span>
              </h1>

              {/* measurement strip below headline */}
              <div className="mt-6 flex items-center gap-3">
                <span className="size-1.5 bg-stone-900" />
                <span className="h-px flex-1 bg-stone-900" />
                <span className="size-1.5 bg-stone-900" />
                <span className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                  set in fraunces, light, optical 144
                </span>
              </div>
            </div>

            {/* right rail — diagram + controls */}
            <aside className="col-span-12 flex flex-col gap-6 lg:col-span-5">
              {/* diagram card */}
              <div className="relative border border-stone-900 bg-[#f6f4ee] p-5">
                <div className="flex items-baseline justify-between [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                  <span>fig. 01</span>
                  <span>An honest workflow</span>
                </div>

                <div className="relative mt-4 h-56">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 400 220"
                    preserveAspectRatio="none"
                  >
                    <line x1="80" y1="40" x2="200" y2="40" stroke="#1c1917" />
                    <line x1="200" y1="40" x2="200" y2="110" stroke="#1c1917" />
                    <line x1="200" y1="110" x2="320" y2="110" stroke="#1c1917" />
                    <line x1="200" y1="110" x2="200" y2="180" stroke="#1c1917" />
                    <line x1="200" y1="180" x2="320" y2="180" stroke="#1c1917" />
                  </svg>

                  <div className="absolute left-0 top-[10%] w-[38%] border border-stone-900 bg-[#f6f4ee] px-2 py-1.5">
                    <p className="[font-family:var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-stone-500">
                      input
                    </p>
                    <p className="[font-family:var(--font-display)] text-sm text-stone-900">
                      Form submitted
                    </p>
                  </div>
                  <div className="absolute left-[42%] top-[42%] w-[20%] border border-stone-900 bg-stone-900 px-2 py-1.5 text-[#f6f4ee]">
                    <p className="[font-family:var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-stone-400">
                      logic
                    </p>
                    <p className="[font-family:var(--font-display)] text-sm">If</p>
                  </div>
                  <div className="absolute right-0 top-[42%] w-[36%] border border-stone-900 bg-[#f6f4ee] px-2 py-1.5">
                    <p className="[font-family:var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-stone-500">
                      action
                    </p>
                    <p className="[font-family:var(--font-display)] text-sm text-stone-900">
                      Email reply
                    </p>
                  </div>
                  <div className="absolute right-0 top-[74%] w-[36%] border border-stone-900 bg-[#f6f4ee] px-2 py-1.5">
                    <p className="[font-family:var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-stone-500">
                      action
                    </p>
                    <p className="[font-family:var(--font-display)] text-sm text-stone-900">
                      Page on-call
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stone-900/20 pt-3 [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                  <span>4 nodes</span>
                  <span>3 edges</span>
                  <span>0 lines of code</span>
                </div>
              </div>

              {/* CTA stack */}
              <div className="grid grid-cols-2 gap-px bg-stone-900">
                <Link
                  href="/auth/signup"
                  className="flex h-16 items-center justify-between bg-stone-900 px-5 text-[#f6f4ee] transition-colors hover:bg-stone-800"
                >
                  <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]">
                    Open canvas
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/auth/login"
                  className="flex h-16 items-center justify-between bg-[#f6f4ee] px-5 text-stone-900 transition-colors hover:bg-stone-100"
                >
                  <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]">
                    Sign in
                  </span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </aside>
          </div>

          {/* footer band — three measured columns */}
          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-8 border-t border-stone-900 pt-8">
            <div className="col-span-12 sm:col-span-4">
              <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                §1 — The Surface
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-700">
                One infinite canvas. No dashboards. No tabs. The thing you are
                building is the thing you see.
              </p>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                §2 — The Pieces
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-700">
                A small, sharp set of nodes — triggers, transforms, branches,
                actions. Typed contracts, no surprises.
              </p>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
                §3 — The Promise
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-700">
                Drop the trigger. Wire the edge. Press run. The first workflow
                ships in under three minutes — we have measured it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — broadsheet */}
      <section className="border-b border-stone-900/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-stone-900/10 px-8 md:grid-cols-4 md:divide-x">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-12 ${i > 0 && i < 4 ? "md:pl-10" : ""} ${i < 3 ? "md:pr-10" : ""}`}
            >
              <p className="[font-family:var(--font-display)] text-5xl font-light tracking-tight text-stone-900">
                {stat.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features — index list */}
      <section className="border-b border-stone-900/10">
        <div className="mx-auto max-w-7xl px-8 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Chapter I — The Toolkit
              </p>
              <h2 className="mt-6 [font-family:var(--font-display)] text-5xl font-light leading-[1.02] tracking-tight text-stone-900 lg:text-6xl">
                Six pieces.
                <br />
                <span className="italic text-stone-600">Infinite</span> arrangements.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone-600">
                Each capability is a primitive. Combine them on the canvas to
                build the exact system your team needs — nothing more, nothing
                less.
              </p>
            </div>

            <ul className="col-span-12 divide-y divide-stone-900/10 border-y border-stone-900/10 lg:col-span-8">
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="group grid grid-cols-12 gap-6 py-8 transition-colors hover:bg-stone-900/[0.02]"
                >
                  <span className="col-span-2 [font-family:var(--font-mono)] text-xs text-stone-400">
                    {feature.index}
                  </span>
                  <h3 className="col-span-10 [font-family:var(--font-display)] text-3xl font-light tracking-tight text-stone-900 sm:col-span-4 lg:text-4xl">
                    {feature.title}
                  </h3>
                  <p className="col-span-12 text-sm leading-relaxed text-stone-600 sm:col-span-5 sm:col-start-7">
                    {feature.description}
                  </p>
                  <ArrowUpRight className="col-span-1 hidden size-5 self-center text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stone-900 sm:block" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Canvas illustration — drawn with CSS, no gradients */}
      <section className="border-b border-stone-900/10 bg-[#efece3]">
        <div className="mx-auto max-w-7xl px-8 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Chapter II — The Canvas
              </p>
              <h2 className="mt-6 [font-family:var(--font-display)] text-5xl font-light leading-[1.02] tracking-tight text-stone-900 lg:text-6xl">
                A surface, not
                <br />
                a <span className="italic">framework</span>.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone-600">
                The canvas is the only place you ever work. Nodes drag, edges
                snap, types flow. Nothing hides behind a sidebar.
              </p>
              <div className="mt-10 flex items-center gap-3 [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-stone-500">
                <span className="size-1.5 bg-stone-900" />
                <span>Live preview</span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div
                className="relative aspect-[5/4] w-full border border-stone-900/15 bg-[#f6f4ee]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                {/* corner crosshairs */}
                <Plus className="absolute -left-2 -top-2 size-4 text-stone-900" strokeWidth={1} />
                <Plus className="absolute -right-2 -top-2 size-4 text-stone-900" strokeWidth={1} />
                <Plus className="absolute -bottom-2 -left-2 size-4 text-stone-900" strokeWidth={1} />
                <Plus className="absolute -bottom-2 -right-2 size-4 text-stone-900" strokeWidth={1} />

                {/* connecting lines */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 400" preserveAspectRatio="none">
                  <path d="M 140 110 C 200 110, 220 200, 280 200" stroke="#1c1917" strokeWidth="1" fill="none" />
                  <path d="M 360 200 C 410 200, 410 290, 360 290" stroke="#1c1917" strokeWidth="1" fill="none" />
                  <path d="M 280 200 C 240 200, 220 290, 240 290" stroke="#1c1917" strokeWidth="1" fill="none" />
                </svg>

                {/* nodes */}
                <div className="absolute left-[8%] top-[18%] w-[28%] border border-stone-900 bg-[#f6f4ee] p-3">
                  <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-stone-500">
                    Trigger
                  </p>
                  <p className="mt-1 [font-family:var(--font-display)] text-lg leading-tight text-stone-900">
                    Webhook received
                  </p>
                </div>

                <div className="absolute left-[44%] top-[42%] w-[28%] border border-stone-900 bg-stone-900 p-3 text-[#f6f4ee]">
                  <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-stone-400">
                    Transform
                  </p>
                  <p className="mt-1 [font-family:var(--font-display)] text-lg leading-tight">
                    Map &amp; validate
                  </p>
                </div>

                <div className="absolute left-[62%] top-[68%] w-[28%] border border-stone-900 bg-[#f6f4ee] p-3">
                  <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-stone-500">
                    Action
                  </p>
                  <p className="mt-1 [font-family:var(--font-display)] text-lg leading-tight text-stone-900">
                    Notify Slack
                  </p>
                </div>

                <div className="absolute left-[36%] top-[68%] w-[22%] border border-stone-900/40 bg-[#f6f4ee] p-3">
                  <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-stone-500">
                    Branch
                  </p>
                  <p className="mt-1 [font-family:var(--font-display)] text-lg leading-tight text-stone-900">
                    If priority
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — three movements */}
      <section className="border-b border-stone-900/10">
        <div className="mx-auto max-w-7xl px-8 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-12">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Chapter III — Three Movements
              </p>
              <h2 className="mt-6 max-w-3xl [font-family:var(--font-display)] text-5xl font-light leading-[1.02] tracking-tight text-stone-900 lg:text-6xl">
                From a <span className="italic">blank</span> rectangle to a
                running system.
              </h2>
            </div>

            <div className="col-span-12 mt-8 grid grid-cols-1 divide-stone-900/10 border-t border-stone-900/10 md:grid-cols-3 md:divide-x">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`py-10 ${i > 0 ? "md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}
                >
                  <p className="[font-family:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-stone-400">
                    Movement {s.n}
                  </p>
                  <h3 className="mt-4 [font-family:var(--font-display)] text-4xl font-light tracking-tight text-stone-900">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-600">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-b border-stone-900/10 bg-stone-900 text-[#f6f4ee]">
        <div className="mx-auto max-w-7xl px-8 py-24 lg:py-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-2">
              <p className="[font-family:var(--font-mono)] text-xs uppercase tracking-[0.22em] text-stone-500">
                Field note
              </p>
            </div>
            <blockquote className="col-span-12 lg:col-span-9">
              <p className="[font-family:var(--font-display)] text-3xl font-light leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-stone-600">&ldquo;</span>
                The first time I dragged a node onto the canvas, I felt
                something I had not felt with software in a long time.{" "}
                <span className="italic">I felt I was making something.</span>
                <span className="text-stone-600">&rdquo;</span>
              </p>
              <footer className="mt-8 text-xs uppercase tracking-[0.22em] text-stone-500">
                — Aiyana R., Staff Engineer
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA — closing colophon */}
      <section className="border-b border-stone-900/10">
        <div className="mx-auto max-w-7xl px-8 py-24 lg:py-32">
          <div className="grid grid-cols-12 items-end gap-8">
            <h2 className="col-span-12 [font-family:var(--font-display)] text-6xl font-light leading-[0.95] tracking-tight text-stone-900 sm:text-7xl lg:col-span-9 lg:text-[8rem]">
              Begin on
              <br />
              <span className="italic text-stone-600">a clean canvas</span>
              <span className="text-stone-400">.</span>
            </h2>
            <div className="col-span-12 lg:col-span-3">
              <Button
                asChild
                size="lg"
                className="h-14 w-full rounded-none bg-stone-900 px-7 text-[13px] uppercase tracking-[0.18em] text-[#f6f4ee] hover:bg-stone-800"
              >
                <Link href="/auth/signup">
                  Get started
                  <ArrowRight className="ml-3 size-4" />
                </Link>
              </Button>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-stone-500">
                Free for solo builders. No card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f6f4ee]">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid grid-cols-12 items-end gap-8 border-t border-stone-900/10 pt-10">
            <div className="col-span-12 lg:col-span-4">
              <p className="[font-family:var(--font-display)] text-2xl tracking-tight text-stone-900">
                Automator
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">
                A canvas for systems thinkers
              </p>
            </div>
            <div className="col-span-12 flex gap-10 text-xs uppercase tracking-[0.18em] text-stone-500 lg:col-span-5">
              <Link href="/" className="hover:text-stone-900">
                Index
              </Link>
              <Link href="/auth/login" className="hover:text-stone-900">
                Sign in
              </Link>
              <Link href="/auth/signup" className="hover:text-stone-900">
                Sign up
              </Link>
            </div>
            <p className="col-span-12 text-xs uppercase tracking-[0.18em] text-stone-400 lg:col-span-3 lg:text-right">
              &copy; MMXXVI — All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
