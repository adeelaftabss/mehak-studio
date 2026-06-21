import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import AuthField from "../components/ui/AuthField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email.trim()) errs.email = "Please enter your email.";
    if (!form.password) errs.password = "Please enter your password.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setServerError("");
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      const redirectTo = location.state?.from || (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Couldn't log in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome Back"
      title="Login to your account"
      subtitle="Track project requests and manage your profile."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
        <AuthField label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="••••••••" />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-surface/60">
            <input type="checkbox" className="rounded border-surface/20 bg-surface/10" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-secondary hover:underline">
            Forgot password?
          </Link>
        </div>

        {serverError && (
          <div className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-surface/80">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>{serverError}</span>
          </div>
        )}

        <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
          <LogIn size={16} /> {submitting ? "Logging in…" : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
}
