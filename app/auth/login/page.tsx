"use client";

import Link from "next/link";

import { LoginForm } from "@/components/login-form";
import { LogoMark, Wordmark } from "@/components/marketing/logo-mark";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#FAFAFA] px-6 py-16 font-sans">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <LogoMark />
        <Wordmark />
      </Link>

      <div className="w-full max-w-md rounded-[16px] border border-gray-200 bg-white p-8 sm:p-10">
        <LoginForm />
      </div>

      <Link
        href="/"
        className="mt-8 text-[13.5px] font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        ← Back to home
      </Link>
    </div>
  );
}
