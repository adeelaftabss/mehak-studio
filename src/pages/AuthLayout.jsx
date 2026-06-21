import { Link } from "react-router-dom";
import RegMark from "../components/ui/RegMark";
import SEO from "../components/seo/SEO";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <section className="grain relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink py-16 text-surface">
      <SEO title={title} path="" noindex />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-primary/20 blur-[100px]" />
      </div>
      <RegMark size={26} className="pointer-events-none absolute left-6 top-20 hidden text-surface/15 sm:block lg:left-12" />
      <RegMark size={26} className="pointer-events-none absolute right-6 top-20 hidden text-surface/15 sm:block lg:right-12" />

      <div className="container-px relative mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold text-surface">
            <img src="/brand/logo-64.png" alt="Mehak Studio" className="h-9 w-9 rounded-full" />
            <span>
              Mehak<span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-surface/10 bg-surface/[0.04] p-6 backdrop-blur-sm sm:p-8">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
          )}
          <h1 className="mt-2 text-balance text-2xl font-semibold sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-surface/55">{subtitle}</p>}

          <div className="mt-6">{children}</div>
        </div>

        {footer && <p className="mt-6 text-center text-sm text-surface/55">{footer}</p>}
      </div>
    </section>
  );
}
