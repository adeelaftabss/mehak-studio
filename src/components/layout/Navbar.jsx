import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import { navLinks, business } from "../../data/siteConfig";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change-ish (escape key as a fallback)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = async () => {
    setAccountOpen(false);
    setOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold text-ink"
          onClick={() => setOpen(false)}
        >
          <img src="/brand/logo-64.png" alt="Mehak Studio" className="h-9 w-9 rounded-full" />
          <span>
            Mehak<span className="text-secondary">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-secondary ${
                    isActive ? "text-secondary" : "text-ink/70"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-secondary/40 hover:text-secondary"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 text-xs font-semibold text-secondary">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </span>
                {user.name?.split(" ")[0]}
              </button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-ink/10 bg-white py-1.5 shadow-lg"
                  >
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-ink/70 hover:bg-ink/5"
                      >
                        <ShieldCheck size={15} /> Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-ink/70 hover:bg-ink/5"
                    >
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-primary hover:bg-primary/5"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button to="/login" variant="ghost">
              Login
            </Button>
          )}
          <Button to="/contact" variant="primary">
            Get a Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink/10 bg-surface lg:hidden"
          >
            <ul className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-ink/80 hover:bg-ink/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2 flex gap-3 px-3">
                {user ? (
                  <>
                    <Button to="/dashboard" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                      Dashboard
                    </Button>
                    <Button variant="primary" className="flex-1" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button to="/login" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                      Login
                    </Button>
                    <Button to="/contact" variant="primary" className="flex-1" onClick={() => setOpen(false)}>
                      Get a Quote
                    </Button>
                  </>
                )}
              </li>
              {user?.role === "admin" && (
                <li className="px-3">
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary hover:bg-secondary/5"
                  >
                    <ShieldCheck size={16} /> Admin Panel
                  </Link>
                </li>
              )}
              <li className="px-3 pt-2 text-xs text-ink/50">
                {business.phone}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
