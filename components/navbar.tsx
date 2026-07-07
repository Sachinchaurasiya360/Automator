"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-stone-900/10 bg-[#f6f4ee]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link
          href="/"
          className="flex items-baseline gap-3 text-stone-900"
        >
          <span className="[font-family:var(--font-display)] text-2xl tracking-tight">
            Automator
          </span>
          <span className="hidden [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500 sm:inline">
            / MMXXVI
          </span>
        </Link>

        {session ? (
          <ul className="flex list-none items-center gap-10">
            <li>
              <Link
                href="/dashboard"
                className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-stone-600 transition-colors hover:text-stone-900"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-stone-600 transition-colors hover:text-stone-900"
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="[font-family:var(--font-mono)] border-b border-stone-900 pb-0.5 text-[11px] uppercase tracking-[0.22em] text-stone-900 transition-opacity hover:opacity-60"
              >
                Sign out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex list-none items-center gap-10">
            <li className="hidden sm:block">
              <Link
                href="/"
                className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-stone-600 transition-colors hover:text-stone-900"
              >
                Index
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="[font-family:var(--font-mono)] border-b border-stone-900 pb-0.5 text-[11px] uppercase tracking-[0.22em] text-stone-900 transition-opacity hover:opacity-60"
              >
                Sign in
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
