import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getServiceIcon } from "../../utils/icons";

export default function ServiceCard({ service, index = 0 }) {
  const Icon = getServiceIcon(service.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/services/${service.slug}`}
        className="group relative flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
          {service.category}
        </span>
        <h3 className="mt-1.5 font-display text-base font-semibold text-ink">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">{service.short}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
          Learn more <ArrowUpRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}
