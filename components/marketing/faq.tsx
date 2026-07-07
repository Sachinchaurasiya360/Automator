import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to write code to use Automator?",
    answer:
      "No. Every workflow is built visually on the canvas by connecting triggers, conditions, and actions. Advanced users can drop in a custom HTTP or code node whenever they need something more specific.",
  },
  {
    question: "How many apps can I connect?",
    answer:
      "Automator natively supports hundreds of apps and services, plus webhooks and a raw HTTP request node for anything that isn't built in yet.",
  },
  {
    question: "What happens if a workflow fails?",
    answer:
      "Failed steps are caught automatically. You can configure retries, fallback paths, and alerts so your team finds out immediately instead of hearing it from a customer.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Starter plan is free forever and includes up to three active workflows and 500 tasks a month — no credit card required.",
  },
  {
    question: "Can my whole team collaborate on workflows?",
    answer:
      "Every workflow lives in a shared workspace with role-based permissions and a full version history, so your team can build and review changes together.",
  },
  {
    question: "Is Automator secure enough for enterprise use?",
    answer:
      "Enterprise plans include SSO, SCIM provisioning, audit logs, and dedicated infrastructure to meet your organization's security and compliance requirements.",
  },
];

export function Faq() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
            FAQ
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 border-t border-gray-200">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
