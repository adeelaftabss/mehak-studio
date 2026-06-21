import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "../ui/Button";
import { api, ApiError } from "../../utils/api";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) errs.subject = "Please enter a subject.";
    if (!form.message.trim()) errs.message = "Please enter a message.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setServerError("");
    setStatus("submitting");
    try {
      await api.post("/inquiries", form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("idle");
      setServerError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong sending your message. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-ink/10 bg-white p-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-ink">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink/55">
          Thanks for reaching out — we'll get back to you shortly. For
          anything urgent, feel free to message us on WhatsApp too.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
        <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} error={errors.subject} />
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-ink/70">Message</label>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary ${
            errors.message ? "border-primary" : "border-ink/15"
          }`}
          placeholder="Tell us about your project, deadline and budget…"
        />
        {errors.message && <p className="mt-1 text-xs text-primary">{errors.message}</p>}
      </div>

      {serverError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
          <span>{serverError}</span>
        </div>
      )}

      <Button type="submit" variant="primary" className="mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
        <Send size={16} /> {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}

function Field({ label, name, type = "text", value, onChange, error }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink/70">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary ${
          error ? "border-primary" : "border-ink/15"
        }`}
        placeholder={label}
      />
      {error && <p className="mt-1 text-xs text-primary">{error}</p>}
    </div>
  );
}
