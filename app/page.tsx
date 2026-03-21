import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Workflow,
  FolderKanban,
  Users,
  CalendarClock,
  BarChart3,
  Plug,
  Zap,
  Shield,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "Workflow Automation",
    description:
      "Build and automate complex workflows with a simple drag-and-drop interface.",
    icon: Workflow,
    color: "bg-blue-600",
  },
  {
    title: "Project Management",
    description:
      "Organize tasks, track progress, and manage deadlines all in one place.",
    icon: FolderKanban,
    color: "bg-indigo-600",
  },
  {
    title: "Team Collaboration",
    description:
      "Collaborate with your team in real-time with shared workspaces and comments.",
    icon: Users,
    color: "bg-emerald-600",
  },
  {
    title: "Smart Scheduling",
    description:
      "AI-powered scheduling that optimizes your team's time and resources.",
    icon: CalendarClock,
    color: "bg-amber-500",
  },
  {
    title: "Analytics & Insights",
    description:
      "Get actionable insights with built-in dashboards and reporting tools.",
    icon: BarChart3,
    color: "bg-rose-600",
  },
  {
    title: "Integrations",
    description:
      "Connect with your favorite tools and services through powerful integrations.",
    icon: Plug,
    color: "bg-violet-600",
  },
];

const steps = [
  {
    step: "01",
    title: "Create Your Project",
    description:
      "Set up your project in seconds. Define goals, invite team members, and start organizing.",
  },
  {
    step: "02",
    title: "Build Workflows",
    description:
      "Design automated workflows with our visual builder. No coding required.",
  },
  {
    step: "03",
    title: "Track & Optimize",
    description:
      "Monitor progress with real-time dashboards and optimize your processes continuously.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500K+", label: "Tasks Automated" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Integrations" },
];

export default function Home() {
  return (
    <div className="min-h-svh">
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-[85vh] items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm text-blue-600">
            <Zap className="size-3.5" />
            Project Management & Automation
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl">
            Automate Your{" "}
            <span className="text-blue-600">Workflow</span>{" "}
            <br className="hidden sm:block" />
            like a Pro
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-500">
            Streamline your projects, automate repetitive tasks, and empower
            your team to focus on what truly matters.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-blue-600 px-8 text-white hover:bg-blue-700">
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/login">Login to Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Everything you need to automate
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
              Powerful features designed to help you manage projects, automate
              workflows, and collaborate with your team effortlessly.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-4 flex size-11 items-center justify-center rounded-lg ${feature.color}`}
                >
                  <feature.icon className="size-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-zinc-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Get started in 3 simple steps
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
                Why Automator
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Built for teams that move fast
              </h2>
              <p className="mt-4 text-zinc-500">
                We designed Automator for modern teams who need to ship faster
                without sacrificing quality or burning out.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Enterprise-grade security with SOC 2 compliance",
                  "Real-time collaboration across time zones",
                  "Unlimited projects and team members",
                  "24/7 priority support for all plans",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-violet-600" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <Shield className="mb-3 size-8 text-violet-600" />
                <h4 className="font-semibold text-zinc-900">Secure</h4>
                <p className="mt-1 text-sm text-zinc-500">
                  End-to-end encryption for all your data.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <Zap className="mb-3 size-8 text-amber-500" />
                <h4 className="font-semibold text-zinc-900">Fast</h4>
                <p className="mt-1 text-sm text-zinc-500">
                  Blazing fast performance, zero lag.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <Users className="mb-3 size-8 text-emerald-600" />
                <h4 className="font-semibold text-zinc-900">Scalable</h4>
                <p className="mt-1 text-sm text-zinc-500">
                  From 5 to 5,000 team members.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <BarChart3 className="mb-3 size-8 text-blue-600" />
                <h4 className="font-semibold text-zinc-900">Insightful</h4>
                <p className="mt-1 text-sm text-zinc-500">
                  Data-driven decisions made easy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-2xl bg-blue-600 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to automate your workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Join thousands of teams already using Automator to ship faster and
            work smarter. Get started for free today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white px-8 text-blue-600 hover:bg-zinc-100">
              <Link href="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-300 text-white hover:bg-blue-700">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Separator />
      <footer className="px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-lg font-semibold text-zinc-900">Automator</p>
          <div className="flex gap-8 text-sm text-zinc-500">
            <Link href="/" className="transition-colors hover:text-zinc-900">Home</Link>
            <Link href="/auth/login" className="transition-colors hover:text-zinc-900">Login</Link>
            <Link href="/auth/signup" className="transition-colors hover:text-zinc-900">Sign up</Link>
          </div>
          <p className="text-sm text-zinc-400">
            &copy; 2026 Automator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
