"use client";

import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid min-h-svh grid-cols-1 bg-[#f6f4ee] text-stone-900 [font-family:var(--font-sans)] lg:grid-cols-2">
      {/* Left — editorial plate */}
      <aside className="relative hidden flex-col justify-between border-r border-stone-900/10 p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative flex items-baseline justify-between [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          <Link href="/" className="text-stone-900 hover:opacity-60">
            ← Index
          </Link>
          <span>Plate II — Re-entry</span>
        </div>

        <div className="relative">
          <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
            Welcome back
          </p>
          <h1 className="mt-6 [font-family:var(--font-display)] text-7xl font-light leading-[0.88] tracking-[-0.04em] text-stone-900 xl:text-8xl">
            The canvas
            <br />
            <span className="italic text-stone-600">remembers</span>
            <span className="text-stone-400">.</span>
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-stone-600">
            Every node, every edge, every revision — exactly where you left it.
            Sign in to pick up the work.
          </p>
        </div>

        <div className="relative flex items-center justify-between border-t border-stone-900/10 pt-6 [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          <span>Automator / MMXXVI</span>
          <span>fig. ii</span>
        </div>
      </aside>

      {/* Right — form */}
      <main className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
