import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Eyebrow from "../components/ui/Eyebrow";
import RegMark from "../components/ui/RegMark";
import Button from "../components/ui/Button";
import BlogCard from "../components/ui/BlogCard";
import { blogPosts } from "../data/blog";
import { business } from "../data/siteConfig";
import SEO from "../components/seo/SEO";
import { breadcrumbSchema, articleSchema } from "../components/seo/structuredData";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
    business.whatsappDefaultMessage
  )}`;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        structuredData={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
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

        <div className="container-px relative mx-auto max-w-3xl py-20 lg:py-28">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-surface/50 hover:text-primary"
          >
            <ArrowLeft size={14} /> All articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6"
          >
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="mt-4 text-balance text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-surface/40">
              {date} · {post.readTime}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white">
        <div className="container-px mx-auto max-w-3xl py-16 lg:py-20">
          <p className="text-base leading-relaxed text-ink/70">{post.excerpt}</p>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink/60 sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-ink/10 bg-surface p-6 text-center sm:p-8">
            <h3 className="font-display text-sm font-semibold text-ink">
              Need help with this?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
              Our team can help put these ideas into practice — from CV
              reviews to full brand and content packages.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/services" variant="primary">
                Explore Services
              </Button>
              <Button href={whatsappUrl} variant="outline">
                <FaWhatsapp size={18} /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-surface">
          <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
            <Eyebrow>More Articles</Eyebrow>
            <h2 className="mt-3 text-balance text-2xl font-semibold text-ink sm:text-3xl">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
