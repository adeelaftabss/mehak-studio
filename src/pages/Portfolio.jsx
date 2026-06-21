import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import PortfolioCard from "../components/ui/PortfolioCard";
import RealPortfolioCard from "../components/ui/RealPortfolioCard";
import Button from "../components/ui/Button";
import { portfolioItems, portfolioCategories } from "../data/portfolio";
import { business } from "../data/siteConfig";
import { api } from "../utils/api";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema } from "../components/seo/structuredData";

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [liveItems, setLiveItems] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    api
      .get("/portfolio")
      .then((data) => {
        if (data.items?.length > 0) {
          setLiveItems(data.items);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Backend unreachable — fall back to placeholder gallery below.
      });
  }, []);

  const filtered = useMemo(() => {
    const source = isLive ? liveItems : portfolioItems;
    return active === "All" ? source : source.filter((p) => p.category === active);
  }, [active, isLive, liveItems]);

  return (
    <>
      <SEO
        title="Portfolio"
        description="See recent work from Mehak Studio across branding, social media, resumes, printing, ads, photo editing and AI-assisted content."
        path="/portfolio"
        structuredData={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
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
          <Eyebrow className="justify-center">Portfolio</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Recent work, organized by category
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
            Branding, social content, resumes, print, ads, photo editing and
            AI-assisted work — project previews are being added here.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
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
            {isLive
              ? filtered.map((item, i) => <RealPortfolioCard key={item._id} item={item} index={i} />)
              : filtered.map((item, i) => <PortfolioCard key={item.id} item={item} index={i} />)}
          </motion.div>

          {/* Note for real content — only shown while still using placeholders */}
          {!isLive && (
            <div className="mt-12 rounded-2xl border border-dashed border-ink/15 bg-white p-6 text-center sm:p-8">
              <h3 className="font-display text-sm font-semibold text-ink">
                Real project previews coming soon
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
                These tiles are placeholders. Once project files are added to
                the admin panel (or dropped into the portfolio-content
                folder), real previews will appear here automatically.
              </p>
              <div className="mt-4 flex justify-center">
                <Button
                  href={`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
                    "Hi! I'd like to see examples of your past work."
                  )}`}
                  variant="outline"
                >
                  Ask to see examples
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
