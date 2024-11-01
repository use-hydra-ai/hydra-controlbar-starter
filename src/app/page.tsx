import CRMDashboard from "../components/dashboard/crm-dashboard";
import SearchBar from "../components/search-bar";
export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)] bg-[#2E3645]">
      <main className="flex flex-col gap-8 items-center justify-center pt-24">
        <div className="w-full max-w-3xl flex flex-col gap-4 justify-center items-center text-white">
          <div className="w-full flex flex-row gap-4 justify-start items-start">
            <h1 className="text-3xl mb-4">Control Bar</h1>
          </div>
          <h2 className="max-w-xl text-xl mb-4">Go beyond search, and let your users interact with your app using natural language.</h2>
        </div>
        <div className="w-full max-w-7xl flex flex-col gap-4 justify-center items-center">
          <SearchBar />
        </div>
        <CRMDashboard />
      </main>
    </div>
  );
}
