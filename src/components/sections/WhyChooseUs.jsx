import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import { about } from "../../data/about";

export default function WhyChooseUs() {
  return (
    <section className="bg-white">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Why Choose Mehak Studio</Eyebrow>
          <h2 className="mt-4 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            A partner you can rely on, project after project
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {about.whyChooseUs.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 rounded-xl border border-ink/10 bg-surface p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check size={13} strokeWidth={3} />
              </span>
              <span className="text-sm text-ink/70">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
