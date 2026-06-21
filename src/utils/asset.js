// Resolves a path under /public correctly whether the site is served from
// the domain root (e.g. Vercel) or a subpath (e.g. GitHub Pages at
// /mehak-studio/). Vite exposes the configured `base` at runtime via
// import.meta.env.BASE_URL — always go through this helper instead of
// hardcoding "/brand/..." style paths directly in components.
//
// Usage: <img src={asset("/brand/logo-64.png")} />
export function asset(path) {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
