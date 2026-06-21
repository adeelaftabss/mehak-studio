import { motion } from "framer-motion";
import RegMark from "../ui/RegMark";
import Button from "../ui/Button";
import { about } from "../../data/about";

export default function Commitment() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grain relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-surface sm:px-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-secondary/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />

        <RegMark size={26} className="absolute left-6 top-6 text-surface/20" />
        <RegMark size={26} className="absolute right-6 top-6 text-surface/20" />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            Our Commitment
          </h2>
          <div className="mt-5 space-y-4 text-left text-sm leading-relaxed text-surface/65 sm:text-center">
            {about.commitment.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="mt-8 font-display text-lg font-semibold sm:text-xl">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Mehak Studio
            </span>{" "}
            — Design. Print. Grow Your Brand.
          </p>

          <div className="mt-8">
            <Button to="/contact" variant="accent">
              Get in Touch
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
