import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Newspaper,
  Star,
  MessageSquare,
  AlertTriangle,
  Mail,
  Briefcase,
  Megaphone,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/portfolio", label: "Portfolio", icon: ImageIcon },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/admin/complaints", label: "Complaints", icon: AlertTriangle },
  { to: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/content", label: "Site Content", icon: SettingsIcon },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/10 bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-ink/10 px-6 py-5">
          <img src="/brand/logo-64.png" alt="Mehak Studio" className="h-8 w-8 rounded-full" />
          <span className="font-display text-sm font-semibold text-ink">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-ink text-surface" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
                  }`
                }
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-ink/10 p-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/60 hover:bg-ink/5 hover:text-ink"
          >
            <ExternalLink size={16} /> View Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-primary hover:bg-primary/5"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <img src="/brand/logo-64.png" alt="Mehak Studio" className="h-7 w-7 rounded-full" />
            <span className="font-display text-sm font-semibold text-ink">Admin</span>
          </div>
          <button onClick={handleLogout} className="text-sm font-medium text-primary">
            Logout
          </button>
        </header>

        {/* Mobile nav scroller */}
        <nav className="flex gap-2 overflow-x-auto border-b border-ink/10 bg-white px-4 py-2 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${
                  isActive ? "bg-ink text-surface" : "bg-ink/5 text-ink/60"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-ink/50">
              Logged in as <span className="font-medium text-ink">{user?.name}</span>
            </p>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
