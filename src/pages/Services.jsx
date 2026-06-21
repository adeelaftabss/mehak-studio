import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import ServiceCard from "../components/ui/ServiceCard";
import { services, serviceCategories } from "../data/siteConfig";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema } from "../components/seo/structuredData";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [active, setActive] = useState(
    serviceCategories.includes(initialCategory) ? initialCategory : "All"
  );

  // Keep state in sync if the query param changes (e.g. nav from About page)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && serviceCategories.includes(cat)) {
      setActive(cat);
    }
  }, [searchParams]);

  const filtered = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [active]
  );

  const handleSelect = (category) => {
    setActive(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <>
      <SEO
        title="Services"
        description="Browse 21 services from Mehak Studio — graphic design, printing, ATS resumes, brand identity, social media content, Google & Meta ads, and more, in Islamabad."
        path="/services"
        structuredData={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
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
          <Eyebrow className="justify-center">Our Services</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Everything your brand and career need
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
            21 services across design, print, careers, marketing, documentation
            and more — browse by category or explore the full list.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm ${
                  active === category
                    ? "border-secondary bg-secondary text-white"
                    : "border-ink/15 text-ink/60 hover:border-secondary/40 hover:text-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-sm text-ink/50">
              No services found in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
