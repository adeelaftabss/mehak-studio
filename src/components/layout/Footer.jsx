import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { business, footerLinks } from "../../data/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-ink text-surface/80">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-surface">
              <img src="/brand/logo-64.png" alt="Mehak Studio" className="h-9 w-9 rounded-full" />
              <span>
                Mehak<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface/60">
              {business.shortDescription}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-surface/40">
              {business.tagline}
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-surface">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-surface/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-surface">Account</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.account.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-surface/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-display text-sm font-semibold text-surface">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-surface/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold text-surface">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-surface/60">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 shrink-0 text-primary" size={16} />
                <span>
                  {business.address.line2}, {business.address.city}, {business.address.country}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0 text-primary" size={16} />
                <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="shrink-0 text-primary" size={16} />
                <a href={`mailto:${business.email}`} className="hover:text-primary break-all">
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface/10 pt-8 text-xs text-surface/40 sm:flex-row">
          <p>© {year} {business.legalName}. All rights reserved.</p>
          <p className="font-mono">Made in Islamabad, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
