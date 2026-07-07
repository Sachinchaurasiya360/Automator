"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEMO_EMAIL = "demo@automator.com";
const DEMO_PASSWORD = "demo1234";

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

  function fillDemoCredentials() {
    setFormData({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
    setError("");
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
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.01em] text-gray-900">
          Sign in to Automator
        </h1>
        <p className="mt-2 text-[14.5px] leading-relaxed text-gray-600">
          Enter your email and password to access your workflows.
        </p>
      </div>

      <div className="rounded-[10px] border border-gray-200 bg-[#FAFAFA] p-4">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-gray-500">
          Demo account
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
          {DEMO_EMAIL} &middot; {DEMO_PASSWORD}
        </p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-3 rounded-[8px] border border-gray-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-gray-900 transition-colors hover:bg-gray-100"
        >
          Autofill demo credentials
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@domain.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-11 rounded-[10px] border-gray-200 px-3.5 text-[14px] focus-visible:border-gray-400 focus-visible:ring-gray-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="h-11 rounded-[10px] border-gray-200 px-3.5 text-[14px] focus-visible:border-gray-400 focus-visible:ring-gray-200"
          />
        </div>

        {error && (
          <p className="rounded-[8px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-[10px] bg-gray-900 text-[14.5px] font-medium text-white hover:bg-gray-800"
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="ml-1.5 size-4" />}
        </Button>
      </form>
    </div>
  );
}
