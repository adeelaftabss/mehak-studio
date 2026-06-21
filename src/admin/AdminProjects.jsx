import { useState } from "react";
import AdminPageHeader from "./components/AdminPageHeader";
import StatusBadge from "./components/StatusBadge";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";

const STATUS_OPTIONS = ["Submitted", "In Progress", "Awaiting Feedback", "Completed", "Cancelled"];

export default function AdminProjects() {
  const { data: projects, loading, error, setData } = useAdminFetch("/projects", (r) => r.projects);
  const [expandedId, setExpandedId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [savingId, setSavingId] = useState(null);

  const updateStatus = async (id, status) => {
    setSavingId(id);
    setActionError("");
    try {
      const { project } = await api.patch(`/projects/${id}/status`, { status });
      setData((prev) => prev.map((p) => (p._id === id ? { ...p, ...project } : p)));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Couldn't update status.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Project Requests" description="Track and update the status of submitted work." />

      {actionError && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          {actionError}
        </div>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : projects.length === 0 ? (
        <AdminEmpty message="No project requests yet." />
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{p.serviceType}</p>
                  <p className="mt-0.5 text-xs text-ink/50">
                    {p.user?.name} ({p.user?.email}) · Submitted {new Date(p.createdAt).toLocaleDateString()}
                    {p.deadline && ` · Deadline ${new Date(p.deadline).toLocaleDateString()}`}
                    {p.budget && ` · Budget ${p.budget}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={p.status} />
                  <select
                    value={p.status}
                    disabled={savingId === p._id}
                    onChange={(e) => updateStatus(p._id, e.target.value)}
                    className="rounded-lg border border-ink/15 bg-surface px-2 py-1.5 text-xs text-ink outline-none focus:border-secondary"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => setExpandedId(expandedId === p._id ? null : p._id)}
                className="mt-3 text-xs font-medium text-secondary hover:underline"
              >
                {expandedId === p._id ? "Hide details" : "View details"}
              </button>

              {expandedId === p._id && (
                <div className="mt-3 rounded-xl bg-surface p-4 text-sm text-ink/70">
                  <p className="whitespace-pre-wrap">{p.details}</p>
                  {p.files?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.files.map((f, i) => (
                        <a
                          key={i}
                          href={`${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "")}${f.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-secondary hover:underline"
                        >
                          {f.originalName}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
