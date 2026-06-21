import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";
import Button from "../components/ui/Button";

const TYPES = ["News", "Promotion", "Offer", "Service Update"];

export default function AdminAnnouncements() {
  const { data: announcements, loading, error, setData } = useAdminFetch("/announcements/all", (r) => r.announcements);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "News",
    homepage: true,
    notificationBar: false,
    dashboard: false,
  });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      setFormError("Title and message are required.");
      return;
    }
    setCreating(true);
    setFormError("");
    try {
      const { announcement } = await api.post("/announcements", {
        title: form.title,
        message: form.message,
        type: form.type,
        displayOn: {
          homepage: form.homepage,
          notificationBar: form.notificationBar,
          dashboard: form.dashboard,
        },
      });
      setData((prev) => [announcement, ...(prev || [])]);
      setForm({ title: "", message: "", type: "News", homepage: true, notificationBar: false, dashboard: false });
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Couldn't create announcement.");
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (a) => {
    try {
      const { announcement } = await api.patch(`/announcements/${a._id}`, { isActive: !a.isActive });
      setData((prev) => prev.map((x) => (x._id === a._id ? announcement : x)));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Couldn't update.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await api.delete(`/announcements/${id}`);
      setData((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Couldn't delete.");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Announcements" description="Promotions, offers, news, and service updates." />

      <form onSubmit={handleCreate} className="mb-6 rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="font-display text-sm font-semibold text-ink">New Announcement</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Message</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink/70">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.homepage}
              onChange={(e) => setForm((f) => ({ ...f, homepage: e.target.checked }))}
            />
            Show on homepage
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.notificationBar}
              onChange={(e) => setForm((f) => ({ ...f, notificationBar: e.target.checked }))}
            />
            Show in notification bar
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.dashboard}
              onChange={(e) => setForm((f) => ({ ...f, dashboard: e.target.checked }))}
            />
            Show in dashboard
          </label>
        </div>
        {formError && <p className="mt-3 text-xs text-primary">{formError}</p>}
        <Button type="submit" variant="primary" className="mt-4" disabled={creating}>
          <Plus size={16} /> {creating ? "Creating…" : "Create Announcement"}
        </Button>
      </form>

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : announcements.length === 0 ? (
        <AdminEmpty message="No announcements yet." />
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a._id} className="flex items-start justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold text-ink">{a.title}</p>
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink/50">
                    {a.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/60">{a.message}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => toggleActive(a)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    a.isActive ? "bg-accent/15 text-accent" : "bg-ink/10 text-ink/40"
                  }`}
                >
                  {a.isActive ? "Active" : "Inactive"}
                </button>
                <button onClick={() => remove(a._id)} className="rounded-lg p-1.5 text-ink/40 hover:bg-primary/10 hover:text-primary">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
