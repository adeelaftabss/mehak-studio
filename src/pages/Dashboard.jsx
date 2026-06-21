import { useState } from "react";
import { LayoutDashboard, ListChecks, FilePlus2, UserCircle } from "lucide-react";
import Eyebrow from "../components/ui/Eyebrow";
import DashboardOverview from "../components/sections/DashboardOverview";
import DashboardRequests from "../components/sections/DashboardRequests";
import DashboardSubmit from "../components/sections/DashboardSubmit";
import DashboardProfile from "../components/sections/DashboardProfile";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, component: DashboardOverview },
  { id: "requests", label: "Your Requests", icon: ListChecks, component: DashboardRequests },
  { id: "submit", label: "Submit Request", icon: FilePlus2, component: DashboardSubmit },
  { id: "profile", label: "Profile", icon: UserCircle, component: DashboardProfile },
];

export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const ActiveComponent = tabs.find((t) => t.id === active)?.component || DashboardOverview;

  return (
    <section className="bg-surface">
      <div className="container-px mx-auto max-w-7xl py-10 lg:py-14">
        <Eyebrow>Dashboard</Eyebrow>
        <h1 className="mt-2 text-balance text-2xl font-semibold text-ink sm:text-3xl">
          Your Dashboard
        </h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Tabs */}
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                    isActive
                      ? "bg-ink text-surface"
                      : "bg-white text-ink/60 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Active panel */}
          <div>
            <ActiveComponent />
          </div>
        </div>
      </div>
    </section>
  );
}
