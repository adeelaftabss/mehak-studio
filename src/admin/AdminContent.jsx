import { useState, useEffect } from "react";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import { AdminLoading, AdminError } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";
import Button from "../components/ui/Button";

export default function AdminContent() {
  const { data: settings, loading, error } = useAdminFetch("/settings", (r) => r.settings);

  return (
    <div>
      <AdminPageHeader
        title="Site Content"
        description="Edit business info, homepage text, and SEO — no code changes needed."
      />

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : (
        <ContentForm initial={settings} />
      )}
    </div>
  );
}

function ContentForm({ initial }) {
  const [business, setBusiness] = useState(initial?.business || {});
  const [homepage, setHomepage] = useState(initial?.homepage || {});
  const [about, setAbout] = useState(initial?.about || {});
  const [seo, setSeo] = useState(initial?.seo || {});
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setBusiness(initial?.business || {});
    setHomepage(initial?.homepage || {});
    setAbout(initial?.about || {});
    setSeo(initial?.seo || {});
  }, [initial]);

  const save = async () => {
    setSaving(true);
    setStatus({ type: "", message: "" });
    try {
      await api.patch("/settings", { business, homepage, about, seo });
      setStatus({ type: "success", message: "Site content updated." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof ApiError ? err.message : "Couldn't save changes." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Business info */}
      <Section title="Business Info">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Legal Name" value={business.legalName} onChange={(v) => setBusiness((b) => ({ ...b, legalName: v }))} />
          <Field label="Display Name" value={business.displayName} onChange={(v) => setBusiness((b) => ({ ...b, displayName: v }))} />
          <Field label="Tagline" value={business.tagline} onChange={(v) => setBusiness((b) => ({ ...b, tagline: v }))} />
          <Field label="Email" value={business.email} onChange={(v) => setBusiness((b) => ({ ...b, email: v }))} />
          <Field label="Phone" value={business.phone} onChange={(v) => setBusiness((b) => ({ ...b, phone: v }))} />
          <Field label="WhatsApp Number" value={business.whatsappNumber} onChange={(v) => setBusiness((b) => ({ ...b, whatsappNumber: v }))} />
        </div>
        <Field
          label="Short Description"
          textarea
          value={business.shortDescription}
          onChange={(v) => setBusiness((b) => ({ ...b, shortDescription: v }))}
        />
      </Section>

      {/* Address */}
      <Section title="Address">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Address Line"
            value={business.address?.line2}
            onChange={(v) => setBusiness((b) => ({ ...b, address: { ...b.address, line2: v } }))}
          />
          <Field
            label="City"
            value={business.address?.city}
            onChange={(v) => setBusiness((b) => ({ ...b, address: { ...b.address, city: v } }))}
          />
        </div>
      </Section>

      {/* Homepage */}
      <Section title="Homepage">
        <Field
          label="Hero Headline"
          value={homepage.heroHeadline}
          onChange={(v) => setHomepage((h) => ({ ...h, heroHeadline: v }))}
        />
        <Field
          label="Hero Subheadline"
          textarea
          value={homepage.heroSubheadline}
          onChange={(v) => setHomepage((h) => ({ ...h, heroSubheadline: v }))}
        />
      </Section>

      {/* About */}
      <Section title="About Page">
        <Field label="Mission" textarea value={about.mission} onChange={(v) => setAbout((a) => ({ ...a, mission: v }))} />
        <Field label="Vision" textarea value={about.vision} onChange={(v) => setAbout((a) => ({ ...a, vision: v }))} />
      </Section>

      {/* SEO */}
      <Section title="SEO">
        <Field label="Meta Title" value={seo.metaTitle} onChange={(v) => setSeo((s) => ({ ...s, metaTitle: v }))} />
        <Field
          label="Meta Description"
          textarea
          value={seo.metaDescription}
          onChange={(v) => setSeo((s) => ({ ...s, metaDescription: v }))}
        />
      </Section>

      {status.message && (
        <div
          className={`flex items-start gap-2 rounded-xl border p-3 text-xs ${
            status.type === "error" ? "border-primary/30 bg-primary/5 text-ink/70" : "border-accent/30 bg-accent/5 text-ink/70"
          }`}
        >
          {status.type === "error" ? (
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-primary" />
          ) : (
            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <Button variant="primary" onClick={save} disabled={saving}>
        <Save size={16} /> {saving ? "Saving…" : "Save All Changes"}
      </Button>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6">
      <h3 className="mb-4 font-display text-sm font-semibold text-ink">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, textarea = false }) {
  const Component = textarea ? "textarea" : "input";
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink/70">{label}</label>
      <Component
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        className="w-full rounded-xl border border-ink/15 bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-secondary"
      />
    </div>
  );
}
