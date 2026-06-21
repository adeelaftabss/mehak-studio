# Mehak Studio — Website (Phase 1: Frontend Foundation)

This is Phase 1 of the Mehak Career & Creative Studio website build: the
frontend foundation, design system, and homepage.

## What's included in this phase

- **Tech stack**: React 19 + Vite + Tailwind CSS v4 + React Router + Framer
  Motion + React Icons + Lucide Icons + Swiper
- **Design system** (`src/index.css`): brand colors (coral / teal / green),
  fonts (Space Grotesk, Inter, JetBrains Mono), and the "print registration
  mark" signature motif used throughout
- **Layout**: responsive Navbar (with mobile menu), Footer, and a floating
  WhatsApp button on every page
- **Homepage**: fully built — hero, services preview grid, "why choose us"
  section, 4-step process, testimonials carousel, and call-to-action
- **Routing**: all site routes from the spec are wired up (`/about`,
  `/services`, `/services/:slug`, `/portfolio`, `/blog`, `/testimonials`,
  `/contact`, `/faq`, `/privacy-policy`, `/terms`, `/login`, `/register`,
  `/forgot-password`, `/dashboard`). Pages other than Home currently show a
  "Coming Soon" placeholder — these will be built out in the next phase.
- **Logo**: your uploaded logo is integrated into the navbar, footer, and
  favicon (`public/brand/`)
- **SEO basics**: meta title/description, Open Graph and Twitter card tags
  in `index.html`

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Where things live

- `src/data/siteConfig.js` — business info, contact details, nav links, and
  the full 21-service catalog. Edit this file to update text shown across
  the site.
- `src/data/testimonials.js` — **placeholder testimonials**. Replace with
  real client reviews (names, roles, quotes) when ready.
- `src/components/sections/` — homepage sections (Hero, ServicesPreview,
  WhyUs, Process, TestimonialsPreview, CTA)
- `src/components/layout/` — Navbar, Footer, WhatsAppButton, Layout
- `src/pages/` — one file per route
- `public/brand/` — logo files at multiple sizes

## What's next (Phase 2+)

1. Build out About, Services (with category filtering), individual service
   detail pages, Portfolio gallery, Blog, Testimonials, Contact (with form),
   FAQ, Privacy Policy and Terms pages
2. Backend (Express + MongoDB): auth, contact/project-request/feedback APIs,
   email notifications
3. User dashboard (connected to backend)
4. Admin panel (content management, portfolio auto-scan, moderation)
5. Final SEO pass (sitemap, robots.txt, structured data), deployment guide

## Notes for content

- Send real portfolio images, service descriptions/pricing if different
  from the defaults, and real testimonials whenever ready — they can be
  dropped into the relevant data files or wired into the admin panel once
  it exists.
