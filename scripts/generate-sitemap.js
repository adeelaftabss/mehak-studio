// Generates public/sitemap.xml from the site's actual routes (static pages,
// all 21 services, and all blog posts) so the sitemap never drifts out of
// sync with what's really on the site.
//
// Run automatically via `npm run build` (see package.json), or manually:
//   node scripts/generate-sitemap.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://www.mehakstudio.com"; // TODO: update to your real production domain

// Static pages, with relative priority/change frequency hints for crawlers.
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/portfolio", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/testimonials", priority: "0.6", changefreq: "weekly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/faq", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

async function loadServiceSlugs() {
  const mod = await import(path.join(__dirname, "..", "src", "data", "siteConfig.js"));
  return mod.services.map((s) => `/services/${s.slug}`);
}

async function loadBlogSlugs() {
  const mod = await import(path.join(__dirname, "..", "src", "data", "blog.js"));
  return mod.blogPosts.map((p) => `/blog/${p.slug}`);
}

function urlEntry(loc, priority = "0.6", changefreq = "monthly") {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generate() {
  const serviceUrls = await loadServiceSlugs();
  const blogUrls = await loadBlogSlugs();

  const entries = [
    ...staticPages.map((p) => urlEntry(p.path, p.priority, p.changefreq)),
    ...serviceUrls.map((p) => urlEntry(p, "0.7", "monthly")),
    ...blogUrls.map((p) => urlEntry(p, "0.6", "monthly")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml);
  console.log(`Sitemap generated: ${outPath} (${entries.length} URLs)`);
}

generate();
