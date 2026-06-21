import { services } from "../../data/siteConfig";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";
import ServiceCard from "../ui/ServiceCard";

// Featured subset shown on the homepage — full catalog lives at /services
const FEATURED_SLUGS = [
  "graphic-design",
  "printing-solutions",
  "ats-cv-resume",
  "social-media-content",
  "brand-identity",
  "business-media-kits",
  "google-ads",
  "photo-editing",
];

const featured = services.filter((s) => FEATURED_SLUGS.includes(s.slug));

export default function ServicesPreview() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold text-ink sm:text-4xl">
            One studio, every service your brand needs
          </h2>
        </div>
        <Button to="/services" variant="outline" className="shrink-0">
          View all 21 services
        </Button>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
