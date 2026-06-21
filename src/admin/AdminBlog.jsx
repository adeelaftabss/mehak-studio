import { useState } from "react";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";
import Button from "../components/ui/Button";

export default function AdminBlog() {
  const { data: blogs, loading, error, setData } = useAdminFetch("/blogs/admin/all", (r) => r.blogs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", excerpt: "", body: "" });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim() || !form.excerpt.trim()) {
      setFormError("Title, category, and excerpt are required.");
      return;
    }
    setCreating(true);
    setFormError("");
    try {
      const { blog } = await api.post("/blogs", {
        title: form.title,
        category: form.category,
        excerpt: form.excerpt,
        sections: form.body.trim()
          ? [{ heading: "Article", paragraphs: form.body.split("\n\n").filter(Boolean) }]
          : [],
        isPublished: true,
      });
      setData((prev) => [blog, ...(prev || [])]);
      setForm({ title: "", category: "", excerpt: "", body: "" });
      setShowForm(false);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Couldn't create post.");
    } finally {
      setCreating(false);
    }
  };

  const togglePublish = async (b) => {
    try {
      const { blog } = await api.patch(`/blogs/${b._id}`, { isPublished: !b.isPublished });
      setData((prev) => prev.map((x) => (x._id === b._id ? blog : x)));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Couldn't update.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setData((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Couldn't delete.");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        description="Publish articles and tips for the public blog."
        action={
          <Button variant="primary" onClick={() => setShowForm((v) => !v)}>
            <Plus size={16} /> New Post
          </Button>
        }
      />

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 rounded-2xl border border-ink/10 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Category</label>
              <input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Career, Branding, Printing"
                className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Excerpt</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
            />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-ink/70">
              Body (separate paragraphs with a blank line)
            </label>
            <textarea
              rows={6}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
            />
          </div>
          {formError && <p className="mt-3 text-xs text-primary">{formError}</p>}
          <Button type="submit" variant="primary" className="mt-4" disabled={creating}>
            {creating ? "Publishing…" : "Publish Post"}
          </Button>
        </form>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : blogs.length === 0 ? (
        <AdminEmpty message="No blog posts yet." />
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b._id} className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold text-ink">{b.title}</p>
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-ink/50">
                    {b.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/55">{b.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => togglePublish(b)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    b.isPublished ? "bg-accent/15 text-accent" : "bg-ink/10 text-ink/40"
                  }`}
                >
                  {b.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                  {b.isPublished ? "Published" : "Draft"}
                </button>
                <button onClick={() => remove(b._id)} className="rounded-lg p-1.5 text-ink/40 hover:bg-primary/10 hover:text-primary">
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
