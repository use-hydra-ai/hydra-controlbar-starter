"use client";
import CRMDashboard from "@/components/dashboard/crm-dashboard";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] bg-[#2E3645]">
      <main className="flex flex-col gap-8 items-center justify-center pt-24">
        <CRMDashboard />
      </main>
    </div>
  );
}
