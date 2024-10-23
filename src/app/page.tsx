import CRMDashboard from "../components/crm-dashboard";
import SearchBar from "../components/search-bar";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] bg-[#2E3645]">
      <main className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">CRM Application</h1>
        <div className="w-full max-w-7xl flex flex-col gap-4 justify-center items-center">
          <h2 className="text-xl font-semibold mb-2">Search Bar</h2>
          <SearchBar />
        </div>
        <CRMDashboard />
      </main>
    </div>
  );
}
