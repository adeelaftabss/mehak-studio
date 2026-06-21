import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share your brief via WhatsApp, the contact form, or your dashboard — service type, files, deadline and budget.",
  },
  {
    number: "02",
    title: "We scope & confirm",
    description:
      "We confirm turnaround time and price upfront, so there are no surprises before work begins.",
  },
  {
    number: "03",
    title: "Design & review",
    description:
      "We get to work and share drafts for feedback — revisions are part of the process, not an afterthought.",
  },
  {
    number: "04",
    title: "Delivery & support",
    description:
      "Final files delivered in the formats you need, with support if anything needs adjusting after handover.",
  },
];

export default function Process() {
  return (
    <section className="bg-surface">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <Eyebrow>How It Works</Eyebrow>
        <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold text-ink sm:text-4xl">
          From brief to delivery in four steps
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface p-6"
            >
              <span className="font-mono text-xs text-primary">{step.number}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
