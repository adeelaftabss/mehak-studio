import { motion } from "framer-motion";
import { FileText, Play } from "lucide-react";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export default function RealPortfolioCard({ item, index = 0 }) {
  const fileUrl = item.fileUrl?.startsWith("http") ? item.fileUrl : `${API_BASE}${item.fileUrl}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-ink"
    >
      {item.fileType === "image" && (
        <img src={fileUrl} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
      )}
      {item.fileType === "video" && (
        <div className="flex h-full w-full items-center justify-center bg-ink text-surface/60">
          <Play size={32} />
        </div>
      )}
      {item.fileType === "pdf" && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink text-surface/60">
          <FileText size={32} />
          <span className="text-xs">PDF Document</span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/80 p-4 backdrop-blur-sm transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-y-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">{item.category}</p>
        <p className="mt-1 font-display text-sm font-semibold text-surface">{item.title}</p>
      </div>
    </motion.div>
  );
}
