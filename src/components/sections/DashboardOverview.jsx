import { useEffect, useState } from "react";
import { FolderClock, CheckCircle2, MessageSquareWarning, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api, ApiError } from "../../utils/api";

const statusStyles = {
  Submitted: "bg-ink/10 text-ink/60",
  "In Progress": "bg-secondary/10 text-secondary",
  "Awaiting Feedback": "bg-primary/10 text-primary",
  Completed: "bg-accent/15 text-accent",
  Cancelled: "bg-ink/10 text-ink/40",
};

export default function DashboardOverview() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/projects/my")
      .then((data) => setProjects(data.projects || []))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your projects."))
      .finally(() => setLoading(false));
  }, []);

  const active = projects.filter((p) => p.status === "In Progress").length;
  const awaiting = projects.filter((p) => p.status === "Awaiting Feedback").length;
  const completed = projects.filter((p) => p.status === "Completed").length;

  const stats = [
    { label: "Active Requests", value: active, icon: FolderClock, color: "text-secondary bg-secondary/10" },
    { label: "Awaiting Your Feedback", value: awaiting, icon: MessageSquareWarning, color: "text-primary bg-primary/10" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-accent bg-accent/15" },
  ];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">
        Welcome back, {user?.name?.split(" ")[0] || "there"}
      </h2>
      <p className="mt-1 text-sm text-ink/55">
        Here's a quick look at your current projects.
      </p>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/60">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-2xl font-semibold text-ink">{loading ? "—" : stat.value}</p>
              <p className="mt-1 text-xs text-ink/50">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="font-display text-sm font-semibold text-ink">Recent Activity</h3>
        <div className="mt-3 overflow-hidden rounded-2xl border border-ink/10 bg-white">
          {loading ? (
            <div className="p-4 text-sm text-ink/40">Loading…</div>
          ) : projects.length === 0 ? (
            <div className="p-4 text-sm text-ink/40">
              You haven't submitted any requests yet. Use "Submit Request" to get started.
            </div>
          ) : (
            projects.slice(0, 5).map((req, i) => (
              <div
                key={req._id}
                className={`flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between ${
                  i !== 0 ? "border-t border-ink/10" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-ink">{req.serviceType}</p>
                  <p className="text-xs text-ink/45">
                    Submitted {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[req.status] || statusStyles.Submitted}`}>
                  {req.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
