"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    setError("");
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res?.error) setError(res.error);
      else router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-10", className)} {...props}>
      <div>
        <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          §1 — Sign in
        </p>
        <h2 className="mt-3 [font-family:var(--font-display)] text-4xl font-light leading-tight tracking-tight text-stone-900">
          Return to your <span className="italic text-stone-600">canvas</span>.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@domain.com"
            required
            onChange={handleChange}
            className="w-full border-0 border-b border-stone-900/30 bg-transparent py-2 [font-family:var(--font-display)] text-2xl font-light text-stone-900 placeholder:text-stone-300 focus:border-stone-900 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="password"
              className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500"
            >
              Password
            </label>
            <Link
              href="#"
              className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500 hover:text-stone-900"
            >
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            onChange={handleChange}
            className="w-full border-0 border-b border-stone-900/30 bg-transparent py-2 [font-family:var(--font-display)] text-2xl font-light text-stone-900 placeholder:text-stone-300 focus:border-stone-900 focus:outline-none"
          />
        </div>

        {error && (
          <p className="border-l-2 border-stone-900 pl-3 [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-stone-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex h-14 w-full items-center justify-between bg-stone-900 px-6 text-[#f6f4ee] transition-colors hover:bg-stone-800 disabled:opacity-50"
        >
          <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]">
            {loading ? "Signing in..." : "Enter the canvas"}
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="flex items-center justify-between border-t border-stone-900/10 pt-6 [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          <span>No account?</span>
          <Link
            href="/auth/signup"
            className="border-b border-stone-900 pb-0.5 text-stone-900 hover:opacity-60"
          >
            Begin →
          </Link>
        </div>
      </form>
    </div>
  );
}
