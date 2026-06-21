import { useState, useEffect } from "react";
import { Save, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { api, ApiError } from "../../utils/api";

export default function DashboardProfile() {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [profileStatus, setProfileStatus] = useState({ type: "", message: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [passwordStatus, setPasswordStatus] = useState({ type: "", message: "" });
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileStatus({ type: "", message: "" });
    setSavingProfile(true);
    try {
      await api.patch("/users/me", { name: profile.name, phone: profile.phone });
      await refreshUser();
      setProfileStatus({ type: "success", message: "Profile updated successfully." });
    } catch (err) {
      setProfileStatus({
        type: "error",
        message: err instanceof ApiError ? err.message : "Couldn't update your profile.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ type: "", message: "" });

    if (passwords.newPassword !== passwords.confirm) {
      setPasswordStatus({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPasswordStatus({ type: "error", message: "New password must be at least 8 characters." });
      return;
    }

    setSavingPassword(true);
    try {
      await api.post("/auth/change-password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswords({ currentPassword: "", newPassword: "", confirm: "" });
      setPasswordStatus({ type: "success", message: "Password updated successfully." });
    } catch (err) {
      setPasswordStatus({
        type: "error",
        message: err instanceof ApiError ? err.message : "Couldn't update your password.",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Your Profile</h2>
      <p className="mt-1 text-sm text-ink/55">Manage your account details.</p>

      <form className="mt-6 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8" onSubmit={handleProfileSubmit}>
        <h3 className="font-display text-sm font-semibold text-ink">Profile Details</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Full Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Email</label>
            <input
              name="email"
              type="email"
              value={profile.email}
              disabled
              title="Contact support to change your email"
              className="w-full cursor-not-allowed rounded-xl border border-ink/15 bg-ink/5 px-4 py-3 text-sm text-ink/50 outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Phone</label>
            <input
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={handleProfileChange}
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>
        </div>

        {profileStatus.message && (
          <StatusMessage type={profileStatus.type} message={profileStatus.message} />
        )}

        <Button type="submit" variant="primary" className="mt-5" disabled={savingProfile}>
          <Save size={16} /> {savingProfile ? "Saving…" : "Save Changes"}
        </Button>
      </form>

      <form className="mt-6 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8" onSubmit={handlePasswordSubmit}>
        <h3 className="font-display text-sm font-semibold text-ink">Change Password</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">New Password</label>
            <input
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Confirm New Password</label>
            <input
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-secondary"
            />
          </div>
        </div>

        {passwordStatus.message && (
          <StatusMessage type={passwordStatus.type} message={passwordStatus.message} />
        )}

        <Button type="submit" variant="outline" className="mt-5" disabled={savingPassword}>
          <KeyRound size={16} /> {savingPassword ? "Updating…" : "Update Password"}
        </Button>
      </form>
    </div>
  );
}

function StatusMessage({ type, message }) {
  const isError = type === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <div
      className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-xs ${
        isError ? "border-primary/30 bg-primary/5 text-ink/70" : "border-accent/30 bg-accent/5 text-ink/70"
      }`}
    >
      <Icon size={14} className={`mt-0.5 shrink-0 ${isError ? "text-primary" : "text-accent"}`} />
      <span>{message}</span>
    </div>
  );
}
