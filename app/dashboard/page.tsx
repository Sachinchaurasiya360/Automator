import { SiteHeader } from "@/components/marketing/site-header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard-content";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div>
      <SiteHeader />
      <DashboardContent />
    </div>
  );
}
