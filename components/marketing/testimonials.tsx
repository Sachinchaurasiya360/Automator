const testimonials = [
  {
    quote:
      "We replaced four hours of manual data entry a week with a single workflow. It runs every morning before anyone even opens their laptop.",
    name: "Priya Shah",
    title: "Head of Operations",
    company: "Northwind",
    initials: "PS",
  },
  {
    quote:
      "The visual builder means our support team ships their own automations without ever filing a ticket with engineering.",
    name: "Marcus Lin",
    title: "VP of Engineering",
    company: "Vertex Labs",
    initials: "ML",
  },
  {
    quote:
      "Error handling was the deciding factor for us. A failed run gets flagged and retried long before it becomes a support ticket.",
    name: "Elena Torres",
    title: "Director of IT",
    company: "Halcyon",
    initials: "ET",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-gray-200 bg-[#FAFAFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
            Trusted by teams who automate the busywork
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-[14px] border border-gray-200 bg-white p-8"
            >
              <blockquote className="text-[15.5px] leading-relaxed text-gray-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[13px] font-medium text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-[13px] text-gray-500">
                    {t.title}, {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
