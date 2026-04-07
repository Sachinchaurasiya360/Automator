"use client";

import { SignupForm } from "@/components/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh grid-cols-1 bg-[#f6f4ee] text-stone-900 [font-family:var(--font-sans)] lg:grid-cols-2">
      {/* Left — form */}
      <main className="order-2 flex items-center justify-center px-8 py-16 lg:order-1">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>

      {/* Right — editorial plate */}
      <aside className="relative order-1 hidden flex-col justify-between border-l border-stone-900/10 p-12 lg:order-2 lg:flex">
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
          <span>Plate III — Enrollment</span>
        </div>

        <div className="relative">
          <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
            A blank canvas
          </p>
          <h1 className="mt-6 [font-family:var(--font-display)] text-7xl font-light leading-[0.88] tracking-[-0.04em] text-stone-900 xl:text-8xl">
            Begin
            <br />
            on <span className="italic text-stone-600">nothing</span>
            <span className="text-stone-400">.</span>
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-stone-600">
            No templates. No onboarding tour. Just an infinite surface and the
            first node, waiting to be dragged.
          </p>

          <ul className="mt-10 space-y-3 [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-stone-600">
            <li className="flex items-center gap-3">
              <span className="size-1.5 bg-stone-900" />
              Free for solo builders
            </li>
            <li className="flex items-center gap-3">
              <span className="size-1.5 bg-stone-900" />
              No credit card
            </li>
            <li className="flex items-center gap-3">
              <span className="size-1.5 bg-stone-900" />
              Three-minute first workflow
            </li>
          </ul>
        </div>

        <div className="relative flex items-center justify-between border-t border-stone-900/10 pt-6 [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          <span>Automator / MMXXVI</span>
          <span>fig. iii</span>
        </div>
      </aside>
    </div>
  );
}
