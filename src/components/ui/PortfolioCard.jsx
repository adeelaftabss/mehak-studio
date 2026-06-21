import { motion } from "framer-motion";
import RegMark from "./RegMark";

// Cycle through brand-color gradient combinations for visual variety
// until real project images are added.
const GRADIENTS = [
  "from-primary/30 via-ink to-secondary/30",
  "from-secondary/30 via-ink to-accent/30",
  "from-accent/25 via-ink to-primary/25",
  "from-primary/25 via-ink to-accent/25",
];

export default function PortfolioCard({ item, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}
    >
      <div className="grain absolute inset-0" />
      <RegMark
        size={36}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-surface/15 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110"
      />
      <span className="absolute left-4 top-4 rounded-full bg-surface/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-surface/50">
        Coming Soon
      </span>

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/80 p-4 backdrop-blur-sm transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-y-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
          {item.category}
        </p>
        <p className="mt-1 font-display text-sm font-semibold text-surface">
          {item.title}
        </p>
      </div>
    </motion.div>
  );
}
