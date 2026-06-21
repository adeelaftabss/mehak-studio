import { motion } from "framer-motion";
import Eyebrow from "../ui/Eyebrow";
import RegMark from "../ui/RegMark";
import { about } from "../../data/about";

export default function AboutHero() {
  return (
    <section className="grain relative overflow-hidden bg-ink text-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-[100px]" />
        <div className="absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <RegMark size={26} className="pointer-events-none absolute left-6 top-20 hidden text-surface/15 sm:block lg:left-12" />
      <RegMark size={26} className="pointer-events-none absolute right-6 top-20 hidden text-surface/15 sm:block lg:right-12" />

      <div className="container-px relative mx-auto max-w-4xl py-24 text-center lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow className="justify-center">About Mehak Studio</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Who We Are
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-sm leading-relaxed text-surface/65 sm:text-base"
        >
          {about.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
