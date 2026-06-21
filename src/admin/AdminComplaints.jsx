import { useState } from "react";
import AdminPageHeader from "./components/AdminPageHeader";
import StatusBadge from "./components/StatusBadge";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";

const STATUS_OPTIONS = ["open", "investigating", "resolved", "closed"];

export default function AdminComplaints() {
  const { data: complaints, loading, error, setData } = useAdminFetch("/complaints", (r) => r.complaints);
  const [actionError, setActionError] = useState("");
  const [savingId, setSavingId] = useState(null);

  const updateStatus = async (id, status) => {
    setSavingId(id);
    setActionError("");
    try {
      const { complaint } = await api.patch(`/complaints/${id}/status`, { status });
      setData((prev) => prev.map((c) => (c._id === id ? complaint : c)));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Couldn't update status.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Complaints" description="Track and resolve client complaints." />

      {actionError && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          {actionError}
        </div>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : complaints.length === 0 ? (
        <AdminEmpty message="No complaints submitted." />
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <div key={c._id} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{c.subject}</p>
                  <p className="text-xs text-ink/45">
                    {c.name} ({c.email}) · {new Date(c.createdAt).toLocaleDateString()}
                    {c.relatedProject && ` · Re: ${c.relatedProject.serviceType}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={c.status} />
                  <select
                    value={c.status}
                    disabled={savingId === c._id}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
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
              <p className="mt-3 text-sm text-ink/70">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
