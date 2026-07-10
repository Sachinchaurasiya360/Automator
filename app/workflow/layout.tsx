import { SiteHeader } from "@/components/marketing/site-header";

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
}
