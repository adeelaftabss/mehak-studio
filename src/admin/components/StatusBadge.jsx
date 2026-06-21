const colorMap = {
  // Generic
  active: "bg-accent/15 text-accent",
  suspended: "bg-primary/15 text-primary",
  pending: "bg-primary/10 text-primary",
  approved: "bg-accent/15 text-accent",
  rejected: "bg-ink/10 text-ink/50",
  new: "bg-secondary/10 text-secondary",
  replied: "bg-accent/15 text-accent",
  archived: "bg-ink/10 text-ink/40",
  open: "bg-primary/10 text-primary",
  investigating: "bg-secondary/10 text-secondary",
  resolved: "bg-accent/15 text-accent",
  closed: "bg-ink/10 text-ink/40",
  reviewed: "bg-secondary/10 text-secondary",
  // Project statuses
  Submitted: "bg-ink/10 text-ink/60",
  "In Progress": "bg-secondary/10 text-secondary",
  "Awaiting Feedback": "bg-primary/10 text-primary",
  Completed: "bg-accent/15 text-accent",
  Cancelled: "bg-ink/10 text-ink/40",
};

export default function StatusBadge({ status }) {
  const classes = colorMap[status] || "bg-ink/10 text-ink/60";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${classes}`}>
      {status}
    </span>
  );
}
