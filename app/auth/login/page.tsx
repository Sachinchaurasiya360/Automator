import { LoginForm } from "@/components/login-form";
import { SiteHeader } from "@/components/marketing/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-[calc(100svh-80px)] flex-col items-center justify-center bg-[#FAFAFA] px-6 py-16 font-sans">
        <div className="w-full max-w-md rounded-[16px] border border-gray-200 bg-white p-8 sm:p-10">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
