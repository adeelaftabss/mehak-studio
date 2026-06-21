import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import StatusBadge from "./components/StatusBadge";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";

export default function AdminTestimonials() {
  const { data: testimonials, loading, error, setData } = useAdminFetch("/testimonials/all", (r) => r.testimonials);
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const moderate = async (id, status) => {
    setBusyId(id);
    setActionError("");
    try {
      const { testimonial } = await api.patch(`/testimonials/${id}/moderate`, { status });
      setData((prev) => prev.map((t) => (t._id === id ? testimonial : t)));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Testimonials" description="Approve or reject reviews before they go live." />

      {actionError && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          {actionError}
        </div>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : testimonials.length === 0 ? (
        <AdminEmpty message="No testimonials submitted yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t._id} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <StatusBadge status={t.status} />
              </div>
              <p className="mt-3 flex-1 text-sm text-ink/70">"{t.quote}"</p>
              <div className="mt-3 border-t border-ink/10 pt-3">
                <p className="text-sm font-medium text-ink">{t.name}</p>
                {t.role && <p className="text-xs text-ink/45">{t.role}</p>}
              </div>

              {t.status === "pending" && (
                <div className="mt-3 flex gap-2">
                  <button
                    disabled={busyId === t._id}
                    onClick={() => moderate(t._id, "approved")}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-accent/15 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/25 disabled:opacity-50"
                  >
                    <Check size={13} /> Approve
                  </button>
                  <button
                    disabled={busyId === t._id}
                    onClick={() => moderate(t._id, "rejected")}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50"
                  >
                    <X size={13} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
