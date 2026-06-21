import { motion } from "framer-motion";
import Button from "../ui/Button";
import RegMark from "../ui/RegMark";
import { business } from "../../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-ink text-surface">
      {/* Gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-secondary/30 blur-[100px]" />
        <div className="absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full bg-primary/25 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent/25 blur-[110px]" />
      </div>

      {/* Registration mark accents */}
      <RegMark
        size={28}
        className="pointer-events-none absolute left-6 top-24 hidden text-surface/20 sm:block lg:left-12"
      />
      <RegMark
        size={28}
        className="pointer-events-none absolute right-6 top-24 hidden text-surface/20 sm:block lg:right-12"
      />

      <div className="container-px relative mx-auto max-w-7xl py-28 lg:py-36">
        <motion.div
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-surface/50"
          >
            <RegMark size={14} className="text-primary" />
            Creative Studio · Islamabad, Pakistan
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Design.
            </span>{" "}
            <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              Print.
            </span>{" "}
            Grow Your Brand.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-balance text-base text-surface/60 sm:text-lg"
          >
            {business.shortDescription}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button to="/contact" variant="accent">
              Start a Project
            </Button>
            <Button to="/portfolio" variant="outline" className="border-surface/20 text-surface hover:border-primary hover:text-primary">
              View Our Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Marquee of service highlights */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-20 overflow-hidden border-t border-surface/10 pt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-[0.2em] text-surface/40">
            {[
              "Graphic Design",
              "Printing",
              "Branding",
              "ATS Resumes",
              "Social Media",
              "Photo Editing",
              "Google & Meta Ads",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
