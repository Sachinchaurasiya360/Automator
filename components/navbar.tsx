"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-center px-4 pt-3">
      <div className="flex w-full max-w-5xl items-center justify-between rounded-xl border border-white/10 bg-zinc-900 px-6 py-3 shadow-lg">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Automator
        </Link>

        {session ? (
          <ul className="flex items-center gap-6 list-none">
            <li>
              <Link
                href="/dashboard"
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Contact us
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                Log out
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-6 list-none">
            <li>
              <Link
                href="/"
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                Sign up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
