import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { api, ApiError } from "../../utils/api";

const statusStyles = {
  Submitted: "bg-ink/10 text-ink/60",
  "In Progress": "bg-secondary/10 text-secondary",
  "Awaiting Feedback": "bg-primary/10 text-primary",
  Completed: "bg-accent/15 text-accent",
  Cancelled: "bg-ink/10 text-ink/40",
};

export default function DashboardRequests() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/projects/my")
      .then((data) => setProjects(data.projects || []))
      .catch((err) => setError(err instanceof ApiError ? err.message : "Couldn't load your requests."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Your Requests</h2>
      <p className="mt-1 text-sm text-ink/55">
        Track the status of everything you've submitted.
      </p>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/60">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        {loading ? (
          <div className="p-4 text-sm text-ink/40">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="p-4 text-sm text-ink/40">No requests submitted yet.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/40">
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Budget</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((req, i) => (
                <tr key={req._id} className={i !== 0 ? "border-t border-ink/10" : ""}>
                  <td className="px-4 py-3 text-ink">{req.serviceType}</td>
                  <td className="px-4 py-3 text-ink/60">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-ink/60">
                    {req.deadline ? new Date(req.deadline).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink/60">{req.budget || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[req.status] || statusStyles.Submitted}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
