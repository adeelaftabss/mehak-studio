import { useState } from "react";
import { ScanLine, Upload, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";
import Button from "../components/ui/Button";

const CATEGORIES = [
  "Logos & Branding",
  "Social Media",
  "Resumes & CVs",
  "Printing",
  "Ads & Marketing",
  "Photo Editing",
  "AI Content",
];

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export default function AdminPortfolio() {
  const { data: items, loading, error, refetch, setData } = useAdminFetch("/portfolio/all", (r) => r.items);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [scanError, setScanError] = useState("");

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleScan = async () => {
    setScanning(true);
    setScanResult("");
    setScanError("");
    try {
      const res = await api.post("/portfolio/scan");
      setScanResult(res.message);
      refetch();
    } catch (err) {
      setScanError(err instanceof ApiError ? err.message : "Scan failed.");
    } finally {
      setScanning(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle.trim()) {
      setUploadError("Please choose a file and enter a title.");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", uploadFile);
      fd.append("title", uploadTitle);
      fd.append("category", uploadCategory);
      const res = await api.post("/portfolio/upload", fd, { isFormData: true });
      setData((prev) => [res.item, ...(prev || [])]);
      setUploadFile(null);
      setUploadTitle("");
    } catch (err) {
      setUploadError(err instanceof ApiError ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this portfolio item?")) return;
    try {
      await api.delete(`/portfolio/${id}`);
      setData((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Couldn't delete item.");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Portfolio"
        description="Manage published work — scan the portfolio-content folder for new files, or upload directly."
      />

      {/* Auto-scan */}
      <div className="mb-6 rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="font-display text-sm font-semibold text-ink">Auto-Import from Folder</h3>
        <p className="mt-1 text-sm text-ink/55">
          Drop files into <code className="rounded bg-surface px-1.5 py-0.5 text-xs">portfolio-content/&lt;category-folder&gt;/</code>{" "}
          on the server, then scan to import them automatically — no code changes needed.
        </p>
        <Button variant="outline" className="mt-4" onClick={handleScan} disabled={scanning}>
          <ScanLine size={16} /> {scanning ? "Scanning…" : "Scan for New Files"}
        </Button>
        {scanResult && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/5 p-3 text-xs text-ink/70">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
            <span>{scanResult}</span>
          </div>
        )}
        {scanError && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>{scanError}</span>
          </div>
        )}
      </div>

      {/* Manual upload */}
      <form onSubmit={handleUpload} className="mb-6 rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="font-display text-sm font-semibold text-ink">Upload Directly</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Title</label>
            <input
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
              placeholder="e.g. Client Logo Final"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Category</label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">File</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.mp4,.pdf"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-dashed border-ink/20 bg-surface px-3 py-2.5 text-sm text-ink/60"
            />
          </div>
        </div>
        {uploadError && <p className="mt-3 text-xs text-primary">{uploadError}</p>}
        <Button type="submit" variant="primary" className="mt-4" disabled={uploading}>
          <Upload size={16} /> {uploading ? "Uploading…" : "Upload"}
        </Button>
      </form>

      {/* Items list */}
      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : items.length === 0 ? (
        <AdminEmpty message="No portfolio items yet — scan the folder or upload one above." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <div className="aspect-[4/3] bg-ink/5">
                {item.fileType === "image" ? (
                  <img
                    src={item.fileUrl.startsWith("http") ? item.fileUrl : `${API_BASE}${item.fileUrl}`}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-ink/40">
                    {item.fileType.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                <p className="text-xs text-ink/45">{item.category}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
