import CRMDashboard from "@/components/dashboard/crm-dashboard";
import TitleSection from "@/components/title-section";
import ControlBar from "../components/control-bar";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] bg-[#2E3645]">
      <main className="flex flex-col gap-8 items-center justify-center pt-24">
        <TitleSection />
        <div className="w-full max-w-7xl flex flex-col gap-4 justify-center items-center">
          <ControlBar />
        </div>
        <CRMDashboard />
      </main>
    </div>
  );
}
