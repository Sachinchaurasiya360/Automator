import { SiteHeader } from "@/components/marketing/site-header";
import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { Features } from "@/components/marketing/features";
import { WorkflowShowcase } from "@/components/marketing/workflow-showcase";
import { Integrations } from "@/components/marketing/integrations";
import { WhyAutomator } from "@/components/marketing/why-automator";
import { Templates } from "@/components/marketing/templates";
import { Testimonials } from "@/components/marketing/testimonials";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function Home() {
  return (
    <div className="min-h-svh bg-white font-sans text-gray-900">
      <SiteHeader />
      <Hero />
      <LogoCloud />
      <Features />
      <WorkflowShowcase />
      <Integrations />
      <WhyAutomator />
      <Templates />
      <Testimonials />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}
