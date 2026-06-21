import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Button from "../ui/Button";
import RegMark from "../ui/RegMark";
import { business } from "../../data/siteConfig";

export default function CTA() {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    business.whatsappDefaultMessage
  )}`;

  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grain relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-surface sm:px-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-secondary/30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />

        <RegMark size={26} className="absolute left-6 top-6 text-surface/20" />
        <RegMark size={26} className="absolute right-6 top-6 text-surface/20" />

        <h2 className="mx-auto max-w-xl text-balance text-3xl font-semibold sm:text-4xl">
          Ready to start your project?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-balance text-sm text-surface/60 sm:text-base">
          Tell us what you need — a design, a print run, a CV, or a full
          brand refresh. We'll get back to you with a clear plan and quote.
        </p>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to="/contact" variant="accent">
            Request a Quote
          </Button>
          <Button
            href={whatsappUrl}
            variant="outline"
            className="border-surface/20 text-surface hover:border-primary hover:text-primary"
          >
            <FaWhatsapp size={18} /> Chat on WhatsApp
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
