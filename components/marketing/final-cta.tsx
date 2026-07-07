import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-gray-900 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
          Automate your work. Focus on what matters.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-400">
          Join thousands of teams who have already replaced their busywork
          with workflows that run on their own.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-12 rounded-[10px] bg-white px-6 text-[15px] font-medium text-gray-900 hover:bg-gray-100"
          >
            <Link href="/auth/login">
              Start Free
              <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-[10px] border-white/20 bg-transparent px-6 text-[15px] font-medium text-white hover:bg-white/10"
          >
            <Link href="/docs">Read Docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
