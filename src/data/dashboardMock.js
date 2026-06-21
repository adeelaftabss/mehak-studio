// MOCK DASHBOARD DATA — for UI preview only.
// Will be replaced with real data from the backend (Phase 3+).

export const mockUser = {
  name: "Adeel Aftab",
  email: "you@example.com",
  phone: "+92 3XX XXXXXXX",
};

export const mockRequests = [
  {
    id: "REQ-1042",
    service: "ATS Optimized CV / Resume",
    submitted: "2026-06-10",
    deadline: "2026-06-14",
    status: "In Progress",
  },
  {
    id: "REQ-1038",
    service: "Brand Identity",
    submitted: "2026-06-02",
    deadline: "2026-06-16",
    status: "Awaiting Feedback",
  },
  {
    id: "REQ-1029",
    service: "Printing Solutions",
    submitted: "2026-05-22",
    deadline: "2026-05-28",
    status: "Completed",
  },
];

export const statusStyles = {
  "In Progress": "bg-secondary/10 text-secondary",
  "Awaiting Feedback": "bg-primary/10 text-primary",
  Completed: "bg-accent/15 text-accent",
  Submitted: "bg-ink/10 text-ink/60",
};
