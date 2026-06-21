import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import AuthField from "../components/ui/AuthField";
import Button from "../components/ui/Button";
import { api, ApiError } from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Account Recovery"
      title="Reset your password"
      subtitle="Enter your email and we'll send you reset instructions."
      footer={
        <>
          Remembered your password?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 size={26} />
          </span>
          <h3 className="mt-4 font-display text-base font-semibold text-surface">
            Check your email
          </h3>
          <p className="mt-2 max-w-sm text-sm text-surface/55">
            If an account exists for {email}, password reset instructions
            have been sent there.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            error={error}
            placeholder="you@example.com"
          />

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-surface/80">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
            <Send size={16} /> {submitting ? "Sending…" : "Send Reset Link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
