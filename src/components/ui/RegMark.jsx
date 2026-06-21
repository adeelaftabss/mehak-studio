// RegMark — the studio's signature motif: a print registration mark
// (the crosshair + circle used to align colour plates in print production).
// Used sparingly as an accent across the site to tie design + print together.

export default function RegMark({ className = "", size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" />
      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
