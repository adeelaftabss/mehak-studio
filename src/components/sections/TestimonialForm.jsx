import { useState } from "react";
import { Star, Send, CheckCircle2, AlertCircle, X } from "lucide-react";
import Button from "../ui/Button";
import { api, ApiError } from "../../utils/api";

export default function TestimonialForm({ onClose }) {
  const [form, setForm] = useState({ name: "", role: "", rating: 5, quote: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.quote.trim()) errs.quote = "Please write your review.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setServerError("");
    setStatus("submitting");
    try {
      await api.post("/testimonials", form);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setServerError(err instanceof ApiError ? err.message : "Couldn't submit your review.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 text-center sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-4 font-display text-base font-semibold text-ink">Thanks for your review!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/55">
          It'll appear on this page once approved by our team.
        </p>
        <Button variant="outline" className="mt-5" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-ink/40 hover:text-ink"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      )}
      <h3 className="font-display text-base font-semibold text-ink">Share your experience</h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary ${
              errors.name ? "border-primary" : "border-ink/15"
            }`}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-primary">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/70">Role / Business (optional)</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            placeholder="e.g. Small business owner"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-ink/70">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setForm((f) => ({ ...f, rating: n }))}
              className={n <= form.rating ? "text-primary" : "text-ink/15"}
            >
              <Star size={22} fill="currentColor" strokeWidth={0} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-ink/70">Your Review</label>
        <textarea
          name="quote"
          rows={4}
          value={form.quote}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary ${
            errors.quote ? "border-primary" : "border-ink/15"
          }`}
          placeholder="Tell us about your experience working with us…"
        />
        {errors.quote && <p className="mt-1 text-xs text-primary">{errors.quote}</p>}
      </div>

      {serverError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
          <span>{serverError}</span>
        </div>
      )}

      <Button type="submit" variant="primary" className="mt-5 w-full sm:w-auto" disabled={status === "submitting"}>
        <Send size={16} /> {status === "submitting" ? "Submitting…" : "Submit Review"}
      </Button>
    </form>
  );
}
