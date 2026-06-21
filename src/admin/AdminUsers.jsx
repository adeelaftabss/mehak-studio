import { useState } from "react";
import { UserX, UserCheck, Trash2, ShieldCheck } from "lucide-react";
import AdminPageHeader from "./components/AdminPageHeader";
import StatusBadge from "./components/StatusBadge";
import { AdminLoading, AdminError, AdminEmpty } from "./components/AdminStates";
import { useAdminFetch } from "./hooks/useAdminFetch";
import { api, ApiError } from "../utils/api";

export default function AdminUsers() {
  const { data: users, loading, error, refetch, setData } = useAdminFetch("/users", (r) => r.users);
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const runAction = async (id, action) => {
    setBusyId(id);
    setActionError("");
    try {
      let updated;
      if (action === "suspend") updated = (await api.patch(`/users/${id}/suspend`)).user;
      if (action === "reactivate") updated = (await api.patch(`/users/${id}/reactivate`)).user;
      if (action === "delete") {
        await api.delete(`/users/${id}`);
        setData((prev) => prev.filter((u) => u._id !== id));
        setBusyId(null);
        return;
      }
      setData((prev) => prev.map((u) => (u._id === id ? updated : u)));
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Users" description="View and manage registered accounts." />

      {actionError && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-ink/70">
          {actionError}
        </div>
      )}

      {loading ? (
        <AdminLoading />
      ) : error ? (
        <AdminError message={error} />
      ) : users.length === 0 ? (
        <AdminEmpty message="No users yet." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/40">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id} className={i !== 0 ? "border-t border-ink/10" : ""}>
                  <td className="px-4 py-3 font-medium text-ink">
                    <span className="flex items-center gap-1.5">
                      {u.name}
                      {u.role === "admin" && <ShieldCheck size={13} className="text-secondary" />}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink/60">{u.email}</td>
                  <td className="px-4 py-3 capitalize text-ink/60">{u.role}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="px-4 py-3 text-ink/50">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {u.status === "active" ? (
                        <button
                          disabled={busyId === u._id || u.role === "admin"}
                          onClick={() => runAction(u._id, "suspend")}
                          title="Suspend"
                          className="rounded-lg p-1.5 text-ink/50 hover:bg-primary/10 hover:text-primary disabled:opacity-30"
                        >
                          <UserX size={15} />
                        </button>
                      ) : (
                        <button
                          disabled={busyId === u._id}
                          onClick={() => runAction(u._id, "reactivate")}
                          title="Reactivate"
                          className="rounded-lg p-1.5 text-ink/50 hover:bg-accent/10 hover:text-accent disabled:opacity-30"
                        >
                          <UserCheck size={15} />
                        </button>
                      )}
                      <button
                        disabled={busyId === u._id || u.role === "admin"}
                        onClick={() => {
                          if (confirm(`Delete ${u.name}? This cannot be undone.`)) runAction(u._id, "delete");
                        }}
                        title="Delete"
                        className="rounded-lg p-1.5 text-ink/50 hover:bg-primary/10 hover:text-primary disabled:opacity-30"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
