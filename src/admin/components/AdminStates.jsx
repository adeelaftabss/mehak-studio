import { AlertCircle, Inbox } from "lucide-react";

export function AdminLoading() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-ink/10 bg-white py-16">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-ink/15 border-t-secondary" />
    </div>
  );
}

export function AdminError({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 py-16 text-center">
      <AlertCircle size={24} className="text-primary" />
      <p className="text-sm text-ink/60">{message || "Something went wrong loading this data."}</p>
    </div>
  );
}

export function AdminEmpty({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-white py-16 text-center">
      <Inbox size={24} className="text-ink/30" />
      <p className="text-sm text-ink/50">{message || "Nothing here yet."}</p>
    </div>
  );
}
