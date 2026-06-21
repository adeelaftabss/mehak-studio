import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import Button from "../components/ui/Button";
import TestimonialForm from "../components/sections/TestimonialForm";
import { testimonials as placeholderTestimonials } from "../data/testimonials";
import { business } from "../data/siteConfig";
import { api } from "../utils/api";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema } from "../components/seo/structuredData";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(placeholderTestimonials);
  const [isLive, setIsLive] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((data) => {
        if (data.testimonials?.length > 0) {
          setTestimonials(
            data.testimonials.map((t) => ({ id: t._id, name: t.name, role: t.role, rating: t.rating, quote: t.quote }))
          );
          setIsLive(true);
        }
        // If the API returns an empty list, keep showing the curated
        // placeholder examples rather than an empty page.
      })
      .catch(() => {
        // Backend unreachable — keep showing placeholders silently.
      });
  }, []);

  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    "Hi Mehak Studio! I'd like to share feedback about a project."
  )}`;

  return (
    <>
      <SEO
        title="Client Reviews"
        description="Read reviews from clients who've worked with Mehak Studio on branding, CVs, social media, printing and more."
        path="/testimonials"
        structuredData={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/testimonials" },
        ])}
      />
      {/* Header */}
      <section className="grain relative overflow-hidden bg-ink text-surface">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-[100px]" />
          <div className="absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-primary/20 blur-[100px]" />
        </div>
        <RegMark size={26} className="pointer-events-none absolute left-6 top-20 hidden text-surface/15 sm:block lg:left-12" />
        <RegMark size={26} className="pointer-events-none absolute right-6 top-20 hidden text-surface/15 sm:block lg:right-12" />

        <div className="container-px relative mx-auto max-w-4xl py-20 text-center lg:py-28">
          <Eyebrow className="justify-center">Client Reviews</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            What our clients say
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
            Feedback from individuals and businesses we've worked with across
            design, print, careers and digital services.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-ink/10 pt-4">
                  <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/50">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* Share feedback */}
          <div className="mt-12">
            {showForm ? (
              <TestimonialForm onClose={() => setShowForm(false)} />
            ) : (
              <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-6 text-center sm:p-8">
                <h3 className="font-display text-sm font-semibold text-ink">
                  Worked with us recently?
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
                  We'd love to hear about your experience — your review will
                  appear here once approved.
                </p>
                <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button variant="primary" onClick={() => setShowForm(true)}>
                    Write a Review
                  </Button>
                  <Button href={whatsappUrl} variant="outline">
                    <FaWhatsapp size={18} /> Or share on WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
