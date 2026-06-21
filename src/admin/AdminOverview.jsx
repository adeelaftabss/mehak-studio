import { Briefcase, Users, Star, Mail, MessageSquare, AlertTriangle } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import { AdminLoading, AdminError } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";

export default function AdminOverview() {
  const projects = useAdminFetch("/projects", (r) => r.projects);
  const users = useAdminFetch("/users", (r) => r.users);
  const testimonials = useAdminFetch("/testimonials/all?status=pending", (r) => r.testimonials);
  const inquiries = useAdminFetch("/inquiries?status=new", (r) => r.inquiries);
  const feedback = useAdminFetch("/feedback", (r) => r.feedback);
  const complaints = useAdminFetch("/complaints?status=open", (r) => r.complaints);

  const loading = [projects, users, testimonials, inquiries, feedback, complaints].some((q) => q.loading);
  const anyError = [projects, users, testimonials, inquiries, feedback, complaints].find((q) => q.error);

  const stats = [
    {
      label: "Active Projects",
      value: projects.data?.filter((p) => ["Submitted", "In Progress", "Awaiting Feedback"].includes(p.status)).length,
      icon: Briefcase,
      color: "bg-secondary/10 text-secondary",
    },
    { label: "Registered Users", value: users.data?.length, icon: Users, color: "bg-accent/15 text-accent" },
    { label: "Pending Reviews", value: testimonials.data?.length, icon: Star, color: "bg-primary/10 text-primary" },
    { label: "New Inquiries", value: inquiries.data?.length, icon: Mail, color: "bg-secondary/10 text-secondary" },
    { label: "Open Feedback", value: feedback.data?.length, icon: MessageSquare, color: "bg-accent/15 text-accent" },
    { label: "Open Complaints", value: complaints.data?.length, icon: AlertTriangle, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="A quick snapshot of what's happening across the site."
      />

      {loading ? (
        <AdminLoading />
      ) : anyError ? (
        <AdminError message={anyError.error} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-ink/10 bg-white p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <p className="mt-3 text-2xl font-semibold text-ink">{stat.value ?? 0}</p>
                <p className="mt-1 text-xs text-ink/50">{stat.label}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h3 className="font-display text-sm font-semibold text-ink">Recent Project Requests</h3>
        {loading ? (
          <p className="mt-3 text-sm text-ink/40">Loading…</p>
        ) : projects.data?.length === 0 ? (
          <p className="mt-3 text-sm text-ink/40">No project requests yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-ink/10">
            {projects.data?.slice(0, 6).map((p) => (
              <div key={p._id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-ink">{p.serviceType}</p>
                  <p className="text-xs text-ink/45">{p.user?.name} · {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="text-xs text-ink/50">{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
