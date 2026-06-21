import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { about } from "../../data/about";

const cards = [
  { icon: Target, label: "Our Mission", text: about.mission },
  { icon: Eye, label: "Our Vision", text: about.vision },
];

export default function MissionVision() {
  return (
    <section className="bg-white">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-ink/10 bg-surface p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {card.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
