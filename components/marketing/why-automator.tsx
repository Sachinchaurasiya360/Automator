const reasons = [
  {
    n: "01",
    title: "Build visually",
    description:
      "Design workflows on a canvas instead of reading documentation. If your team can draw the process, they can automate it.",
  },
  {
    n: "02",
    title: "Deploy instantly",
    description:
      "Publish changes the moment you make them — no build step, no staging environment, no waiting on a release window.",
  },
  {
    n: "03",
    title: "Scale workflows",
    description:
      "From a handful of runs a day to millions. The same workflow keeps working as your team and your data grow.",
  },
  {
    n: "04",
    title: "Connect everything",
    description:
      "Hundreds of native integrations, plus webhooks and a raw HTTP node for the handful of tools that need custom work.",
  },
  {
    n: "05",
    title: "Reduce manual work",
    description:
      "Replace copy-paste, manual data entry, and status updates with automations that run the same way every time.",
  },
  {
    n: "06",
    title: "Enterprise-ready reliability",
    description:
      "Retries, error handling, detailed run logs, and granular permissions are built in from the very first workflow.",
  },
];

export function WhyAutomator() {
  return (
    <section className="border-b border-gray-200 bg-[#FAFAFA] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Why Automator
            </p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
              Built for teams who ship, not teams who wait
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-600">
              Most automation tools force a trade-off between ease of use and
              real capability. Automator was built so your team never has to
              choose.
            </p>
          </div>

          <div className="border-t border-gray-200">
            {reasons.map((reason) => (
              <div
                key={reason.n}
                className="flex gap-6 border-b border-gray-200 py-8"
              >
                <span className="w-10 shrink-0 text-[15px] font-semibold tabular-nums text-gray-300">
                  {reason.n}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-gray-900">
                    {reason.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-gray-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
