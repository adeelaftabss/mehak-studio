import { useState } from "react";
import { Send } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import StatusBadge from "./components/StatusBadge";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";

export default function AdminFeedback() {
  const { data: feedback, loading, error, setData } = useAdminFetch("/feedback", (r) => r.feedback);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingId, setSendingId] = useState(null);
  const [actionError, setActionError] = useState("");

  const sendReply = async (id) => {
    const adminReply = replyDrafts[id]?.trim();
    if (!adminReply) return;
    setSendingId(id);
    setActionError("");
    try {
      const { feedback: updated } = await api.patch(`/feedback/${id}/reply`, { adminReply });
      setData((prev) => prev.map((f) => (f._id === id ? updated : f)));
      setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Couldn't send reply.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Feedback" description="Suggestions, compliments, complaints, and experience reviews." />

      {actionError && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          {actionError}
        </div>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : feedback.length === 0 ? (
        <AdminEmpty message="No feedback submitted yet." />
      ) : (
        <div className="space-y-3">
          {feedback.map((f) => (
            <div key={f._id} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{f.type}</p>
                  <p className="text-xs text-ink/45">
                    {f.user?.name || "Guest"} · {new Date(f.createdAt).toLocaleDateString()}
                    {f.rating && ` · ${f.rating}/5`}
                  </p>
                </div>
                <StatusBadge status={f.status} />
              </div>
              <p className="mt-3 text-sm text-ink/70">{f.message}</p>

              {f.adminReply && (
                <div className="mt-3 rounded-xl bg-secondary/5 p-3 text-sm text-ink/70">
                  <p className="text-xs font-medium text-secondary">Your reply:</p>
                  {f.adminReply}
                </div>
              )}

              {f.user && f.status !== "replied" && (
                <div className="mt-3 flex gap-2">
                  <input
                    value={replyDrafts[f._id] || ""}
                    onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [f._id]: e.target.value }))}
                    placeholder="Write a reply…"
                    className="flex-1 rounded-xl border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary"
                  />
                  <button
                    onClick={() => sendReply(f._id)}
                    disabled={sendingId === f._id}
                    className="flex items-center gap-1 rounded-xl bg-ink px-3 py-2 text-xs font-medium text-surface hover:bg-secondary disabled:opacity-50"
                  >
                    <Send size={13} />
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
