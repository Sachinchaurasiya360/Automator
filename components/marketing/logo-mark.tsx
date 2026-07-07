import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-gray-900",
        className,
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="3" cy="3" r="2" fill="#FFFFFF" />
        <circle cx="13" cy="3" r="2" fill="#FFFFFF" />
        <circle cx="8" cy="13" r="2" fill="#FFFFFF" />
        <path
          d="M4.6 4.1L6.8 11.4M11.4 4.1L9.2 11.4M5 3H11"
          stroke="#FFFFFF"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[17px] font-semibold tracking-[-0.01em] text-gray-900",
        className,
      )}
    >
      Automator
    </span>
  );
}
