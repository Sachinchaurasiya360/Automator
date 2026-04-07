"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setError("");
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post("/api/auth/signup", { ...formData });
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      router.replace("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data?.error;
        if (typeof data === "string") setError(data);
        else if (typeof data === "object")
          setError(Object.values(data).flat().join(", "));
        else setError("Something went wrong");
      }
      setLoading(false);
    }
  }

  const fields = [
    { id: "name", label: "Full name", type: "text", placeholder: "Jane Doe", num: "01" },
    { id: "email", label: "Email", type: "email", placeholder: "name@domain.com", num: "02" },
    { id: "password", label: "Password", type: "password", placeholder: "", num: "03" },
  ];

  return (
    <div className={cn("flex flex-col gap-10", className)} {...props}>
      <div>
        <p className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          §1 — Enrollment
        </p>
        <h2 className="mt-3 [font-family:var(--font-display)] text-4xl font-light leading-tight tracking-tight text-stone-900">
          Open a fresh <span className="italic text-stone-600">canvas</span>.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {fields.map((f) => (
          <div key={f.id} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor={f.id}
                className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500"
              >
                {f.label}
              </label>
              <span className="[font-family:var(--font-mono)] text-[10px] tracking-[0.22em] text-stone-300">
                {f.num}
              </span>
            </div>
            <input
              id={f.id}
              type={f.type}
              placeholder={f.placeholder}
              required
              onChange={handleChange}
              className="w-full border-0 border-b border-stone-900/30 bg-transparent py-2 [font-family:var(--font-display)] text-2xl font-light text-stone-900 placeholder:text-stone-300 focus:border-stone-900 focus:outline-none"
            />
          </div>
        ))}

        {error && (
          <p className="border-l-2 border-stone-900 pl-3 [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-stone-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 flex h-14 w-full items-center justify-between bg-stone-900 px-6 text-[#f6f4ee] transition-colors hover:bg-stone-800 disabled:opacity-50"
        >
          <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]">
            {loading ? "Creating..." : "Open the canvas"}
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>

        <div className="flex items-center justify-between border-t border-stone-900/10 pt-6 [font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-stone-500">
          <span>Already enrolled?</span>
          <Link
            href="/auth/login"
            className="border-b border-stone-900 pb-0.5 text-stone-900 hover:opacity-60"
          >
            Sign in →
          </Link>
        </div>
      </form>
    </div>
  );
}
