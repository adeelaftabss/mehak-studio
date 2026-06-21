import { motion } from "framer-motion";
import { Layers, Globe2, Clock, ShieldCheck } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import RegMark from "../ui/RegMark";

const features = [
  {
    icon: Layers,
    title: "One studio, start to finish",
    description:
      "Design, print, and career documents handled under one roof — no juggling multiple freelancers or vendors.",
  },
  {
    icon: Globe2,
    title: "Bilingual by default",
    description:
      "Fluent in English and Urdu, so official documents, CVs and applications are accurate in both languages.",
  },
  {
    icon: Clock,
    title: "Fast, realistic turnaround",
    description:
      "Clear timelines agreed up front, with status updates so you always know where your project stands.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Pakistani requirements",
    description:
      "From government formatting standards to local printing specs, work is prepared the way local institutions expect it.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white">
      <div className="container-px mx-auto grid max-w-7xl gap-16 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <Eyebrow>Why Mehak Studio</Eyebrow>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold text-ink sm:text-4xl">
            A creative partner that understands your market
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55">
            Whether you're a business needing brand assets, or an individual
            applying for your next role, we bring design quality and local
            know-how together.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon size={22} className="text-primary" strokeWidth={1.75} />
                  <h3 className="mt-3 font-display text-sm font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/55">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Abstract visual panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink lg:aspect-square"
        >
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-secondary/30 blur-[80px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/25 blur-[90px]" />
          <div className="absolute inset-0 grain" />

          {/* Corner registration marks */}
          <RegMark size={24} className="absolute left-6 top-6 text-surface/25" />
          <RegMark size={24} className="absolute bottom-6 right-6 text-surface/25" />

          {/* Centered logo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-surface/40">
              Est. in Islamabad
            </span>
            <img
              src="/brand/logo-512.png"
              alt="Mehak Career & Creative Studio"
              className="h-40 w-40 rounded-full shadow-2xl sm:h-48 sm:w-48"
            />
            <span className="max-w-xs text-sm text-surface/50">
              Design. Print. Grow Your Brand.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
