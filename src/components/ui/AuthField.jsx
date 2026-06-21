export default function AuthField({ label, name, type = "text", value, onChange, error, ...rest }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-surface/70">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-surface/[0.06] px-4 py-3 text-sm text-surface outline-none transition-colors placeholder:text-surface/30 focus:border-secondary ${
          error ? "border-primary" : "border-surface/15"
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-primary">{error}</p>}
    </div>
  );
}
