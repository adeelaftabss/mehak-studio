import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import Button from "../components/ui/Button";
import ServiceCard from "../components/ui/ServiceCard";
import { services, business } from "../data/siteConfig";
import { getServiceIcon } from "../utils/icons";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema, serviceSchema } from "../components/seo/structuredData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = getServiceIcon(service.icon);
  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  const whatsappMessage = `Hi Mehak Studio! I'd like to request a quote for: ${service.title}.`;
  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      <SEO
        title={service.title}
        description={service.description}
        path={`/services/${service.slug}`}
        structuredData={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      {/* Header */}
      <section className="grain relative overflow-hidden bg-ink text-surface">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-[100px]" />
          <div className="absolute -right-24 top-0 h-[22rem] w-[22rem] rounded-full bg-primary/20 blur-[100px]" />
        </div>
        <RegMark size={26} className="pointer-events-none absolute left-6 top-20 hidden text-surface/15 sm:block lg:left-12" />
        <RegMark size={26} className="pointer-events-none absolute right-6 top-20 hidden text-surface/15 sm:block lg:right-12" />

        <div className="container-px relative mx-auto max-w-4xl py-20 lg:py-28">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-surface/50 hover:text-primary"
          >
            <ArrowLeft size={14} /> All services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <Eyebrow>{service.category}</Eyebrow>
            </div>
            <h1 className="mt-5 max-w-2xl text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
              {service.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button to="/contact" variant="accent">
                Request a Quote
              </Button>
              <Button
                href={whatsappUrl}
                variant="outline"
                className="border-surface/20 text-surface hover:border-primary hover:text-primary"
              >
                <FaWhatsapp size={18} /> Ask on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-white">
        <div className="container-px mx-auto max-w-4xl py-16 lg:py-20">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            What's included
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-ink/10 bg-surface p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="text-sm text-ink/70">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-ink/10 bg-surface p-6 sm:p-8">
            <h3 className="font-display text-sm font-semibold text-ink">
              Not sure exactly what you need?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">
              Send us a brief description of your project — even a rough idea
              is fine — and we'll recommend the right service, format and
              turnaround for {business.displayName}.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
              <Button href={whatsappUrl} variant="outline">
                <FaWhatsapp size={18} /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-surface">
          <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
            <Eyebrow>Related Services</Eyebrow>
            <h2 className="mt-3 text-balance text-2xl font-semibold text-ink sm:text-3xl">
              More in {service.category}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
