import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import BlogCard from "../components/ui/BlogCard";
import { blogPosts, blogCategories } from "../data/blog";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema } from "../components/seo/structuredData";

export default function Blog() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      <SEO
        title="Blog"
        description="Tips on design, branding, careers, printing and digital marketing from the Mehak Studio team."
        path="/blog"
        structuredData={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
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
          <Eyebrow className="justify-center">Blog</Eyebrow>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            Tips on design, careers & growth
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-sm text-surface/60 sm:text-base">
            Practical guidance from our team on branding, printing, careers,
            and digital marketing.
          </p>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-surface">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
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
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
