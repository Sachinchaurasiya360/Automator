"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoMark, Wordmark } from "@/components/marketing/logo-mark";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "Workflows", href: "#builder" },
  { label: "Integrations", href: "#integrations" },
  { label: "Templates", href: "#templates" },
];

export function SiteHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-saturate-100">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[14px] font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-[14px] font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Button
                variant="ghost"
                className="h-9 rounded-[10px] px-4 text-[14px] font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="h-9 rounded-[10px] bg-gray-900 px-4 text-[14px] font-medium text-white hover:bg-gray-800"
            >
              <Link href="/auth/login">
                Sign in
                <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-[10px] border border-gray-200 text-gray-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-medium text-gray-700"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-5">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[15px] font-medium text-gray-700"
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  className="h-10 rounded-[10px] border-gray-200 text-[14px] font-medium"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="h-10 rounded-[10px] bg-gray-900 text-[14px] font-medium text-white hover:bg-gray-800"
              >
                <Link href="/auth/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
