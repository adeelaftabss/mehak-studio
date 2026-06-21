import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ post, index = 0 }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-secondary">
          <span>{post.category}</span>
          <span className="text-ink/20">•</span>
          <span className="text-ink/40">{post.readTime}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-ink">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-xs text-ink/40">{date}</span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
            Read more <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
