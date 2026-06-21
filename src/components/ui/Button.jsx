import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-medium transition-all duration-300 ease-[var(--ease-premium)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

const variants = {
  primary:
    "bg-ink text-surface hover:bg-secondary px-6 py-3 text-sm shadow-[0_1px_0_0_rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-0.5",
  outline:
    "border border-ink/15 text-ink hover:border-secondary hover:text-secondary px-6 py-3 text-sm",
  accent:
    "bg-primary text-surface hover:bg-primary-dark px-6 py-3 text-sm hover:-translate-y-0.5 hover:shadow-lg",
  ghost: "text-ink hover:text-secondary px-2 py-1 text-sm",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}) {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
