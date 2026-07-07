const companies = [
  { name: "Northwind", mark: "square" },
  { name: "Vertex Labs", mark: "triangle" },
  { name: "Halcyon", mark: "circle" },
  { name: "Ridgeline", mark: "diamond" },
  { name: "Meridian", mark: "square" },
  { name: "Fieldstone", mark: "circle" },
] as const;

function Mark({ shape }: { shape: (typeof companies)[number]["mark"] }) {
  const common = "size-3 shrink-0 bg-gray-400";
  if (shape === "circle") return <span className={`${common} rounded-full`} />;
  if (shape === "diamond") return <span className={`${common} rotate-45 rounded-[2px]`} />;
  if (shape === "triangle")
    return (
      <span
        className="size-0 shrink-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-gray-400"
        aria-hidden
      />
    );
  return <span className={`${common} rounded-[2px]`} />;
}

function LogoRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-14 pr-14"
      aria-hidden={ariaHidden}
    >
      {companies.map((company) => (
        <div
          key={company.name}
          className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-600"
        >
          <Mark shape={company.mark} />
          <span className="whitespace-nowrap text-[16px] font-semibold tracking-tight">
            {company.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LogoCloud() {
  return (
    <section className="border-b border-gray-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-[12px] font-medium uppercase tracking-[0.14em] text-gray-400">
          Trusted by operations teams at
        </p>
        <div className="group relative mt-8 overflow-hidden">
          <div className="flex w-max animate-[marquee_26s_linear_infinite] group-hover:[animation-play-state:paused]">
            <LogoRow />
            <LogoRow ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
