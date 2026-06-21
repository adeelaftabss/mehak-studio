import { useState, useEffect } from "react";
import { Send, AlertCircle, CheckCircle2, Paperclip } from "lucide-react";
import Button from "../ui/Button";
import { api, ApiError } from "../../utils/api";

const initialState = { service: "", details: "", deadline: "", budget: "" };

export default function DashboardSubmit() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [serverError, setServerError] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    api
      .get("/services")
      .then((data) => setServices(data.services || []))
      .catch(() => setServices([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleFile = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.service) errs.service = "Please select a service.";
    if (!form.details.trim()) errs.details = "Please describe your project.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setServerError("");
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("serviceType", form.service);
      fd.append("details", form.details);
      if (form.deadline) fd.append("deadline", form.deadline);
      if (form.budget) fd.append("budget", form.budget);
      if (file) fd.append("files", file);

      await api.post("/projects", fd, { isFormData: true });
      setStatus("success");
      setForm(initialState);
      setFile(null);
    } catch (err) {
      setStatus("idle");
      setServerError(
        err instanceof ApiError ? err.message : "Couldn't submit your request. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-ink/10 bg-white p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">
          Request submitted
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink/55">
          We've received your request and will follow up with a quote and
          timeline. You can track its status under "Your Requests."
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Submit a New Request</h2>
      <p className="mt-1 text-sm text-ink/55">
        Tell us what you need and we'll get back to you with a quote and
        timeline.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Service Type</label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary ${
                errors.service ? "border-primary" : "border-ink/15"
              }`}
            >
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            {errors.service && <p className="mt-1 text-xs text-primary">{errors.service}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Deadline (optional)</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Project Details</label>
          <textarea
            name="details"
            rows={5}
            value={form.details}
            onChange={handleChange}
            placeholder="Describe what you need — references, sizes, formats, anything that helps us scope your project…"
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary ${
              errors.details ? "border-primary" : "border-ink/15"
            }`}
          />
          {errors.details && <p className="mt-1 text-xs text-primary">{errors.details}</p>}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Budget (optional)</label>
            <input
              type="text"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="e.g. PKR 5,000 – 10,000"
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Attach File (optional)</label>
            <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-dashed border-ink/20 bg-surface px-4 py-3 text-sm text-ink/50 transition-colors hover:border-secondary hover:text-secondary">
              <Paperclip size={16} />
              <span className="truncate">{file?.name || "PDF, DOCX, PNG, JPG or ZIP"}</span>
              <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.docx,.doc,.png,.jpg,.jpeg,.zip" />
            </label>
          </div>
        </div>

        {serverError && (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>{serverError}</span>
          </div>
        )}

        <Button type="submit" variant="primary" className="mt-5 w-full sm:w-auto" disabled={status === "submitting"}>
          <Send size={16} /> {status === "submitting" ? "Submitting…" : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}
