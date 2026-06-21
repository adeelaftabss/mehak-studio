import { useState } from "react";
import { Send } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import StatusBadge from "./components/StatusBadge";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";

export default function AdminInquiries() {
  const { data: inquiries, loading, error, setData } = useAdminFetch("/inquiries", (r) => r.inquiries);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sendingId, setSendingId] = useState(null);
  const [actionError, setActionError] = useState("");

  const sendReply = async (id) => {
    const adminReply = replyDrafts[id]?.trim();
    if (!adminReply) return;
    setSendingId(id);
    setActionError("");
    try {
      const { inquiry } = await api.patch(`/inquiries/${id}/reply`, { adminReply });
      setData((prev) => prev.map((i) => (i._id === id ? inquiry : i)));
      setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Couldn't send reply.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Inquiries" description="Contact form submissions from the website." />

      {actionError && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          {actionError}
        </div>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : inquiries.length === 0 ? (
        <AdminEmpty message="No inquiries yet." />
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq._id} className="rounded-2xl border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{inq.subject}</p>
                  <p className="text-xs text-ink/45">
                    {inq.name} ({inq.email}{inq.phone ? `, ${inq.phone}` : ""}) ·{" "}
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={inq.status} />
              </div>
              <p className="mt-3 text-sm text-ink/70">{inq.message}</p>

              {inq.adminReply && (
                <div className="mt-3 rounded-xl bg-secondary/5 p-3 text-sm text-ink/70">
                  <p className="text-xs font-medium text-secondary">Your reply:</p>
                  {inq.adminReply}
                </div>
              )}

              {inq.status !== "replied" && (
                <div className="mt-3 flex gap-2">
                  <input
                    value={replyDrafts[inq._id] || ""}
                    onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [inq._id]: e.target.value }))}
                    placeholder="Write a reply…"
                    className="flex-1 rounded-xl border border-ink/15 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-secondary"
                  />
                  <button
                    onClick={() => sendReply(inq._id)}
                    disabled={sendingId === inq._id}
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
