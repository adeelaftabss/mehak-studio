import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import AuthField from "../components/ui/AuthField";
import Button from "../components/ui/Button";
import { api, ApiError } from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.password) {
      errs.password = "Please enter a new password.";
    } else if (form.password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (form.confirmPassword !== form.password) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setServerError("");
    setSubmitting(true);
    try {
      await api.post("/auth/reset-password", { token, password: form.password });
      setDone(true);
      setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Couldn't reset your password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Account Recovery"
      title="Choose a new password"
      subtitle="Enter and confirm your new password below."
      footer={
        <>
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      {done ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 size={26} />
          </span>
          <h3 className="mt-4 font-display text-base font-semibold text-surface">
            Password updated
          </h3>
          <p className="mt-2 max-w-sm text-sm text-surface/55">
            Taking you to your dashboard…
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthField
            label="New Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="At least 8 characters"
          />
          <AuthField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />

          {serverError && (
            <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-surface/80">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
              <span>{serverError}</span>
            </div>
          )}

          <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
            <KeyRound size={16} /> {submitting ? "Updating…" : "Update Password"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
