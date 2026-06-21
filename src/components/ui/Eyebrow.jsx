import RegMark from "./RegMark";

// Eyebrow label — mono font, used above section headings.
// `mark` toggles the registration-mark accent for the studio's signature motif.
export default function Eyebrow({ children, mark = true, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-secondary ${className}`}
    >
      {mark && <RegMark size={14} className="text-primary" />}
      <span>{children}</span>
    </div>
  );
}
