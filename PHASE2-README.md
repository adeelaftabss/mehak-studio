# Mehak Studio — Website (Phase 2: Core Public Pages)

Builds on Phase 1. New in this phase:

## New pages (fully built, not placeholders anymore)

- **About** (`/about`) — Who We Are, Mission & Vision, "What We Do" (8 service
  category groups linking into the Services page), Why Choose Us checklist,
  and a closing Commitment/CTA section. Content comes from `src/data/about.js`.
- **Services** (`/services`) — full directory of all 21 services with
  category filter pills. Supports deep-linking via
  `/services?category=Photo%20%26%20Media` (used by the About page's
  "View services" links).
- **Service Detail** (`/services/:slug`) — header with icon/category/title,
  "What's included" highlight list, a contact/WhatsApp CTA block, and related
  services from the same category. Unknown slugs redirect to `/services`.
- **Contact** (`/contact`) — working contact form (client-side validated,
  shows a success state on submit — backend wiring is a Phase 3 TODO marked
  in `ContactForm.jsx`), business info card, Google Maps embed, a real
  generated QR code linking to the studio's location, and a "Get Directions"
  button.
- **Portfolio** (`/portfolio`) — category-filterable gallery. Currently shows
  placeholder tiles (clearly marked "Coming Soon") since no project images
  were available yet — see "Next steps" below.

## Data model changes

- `src/data/siteConfig.js` — services now use an 8-category structure
  matching the About page's "What We Do" section (Creative & Design,
  Printing Solutions, Career & Professional, Digital Marketing, Documentation
  & Composing, Online Assistance, Technology Solutions, Photo & Media). Each
  service has a `highlights` array shown on its detail page. Business address
  now includes real coordinates for the map embed, directions link, and QR
  code.
- `src/data/about.js` — mission, vision, why-choose-us list, commitment text.
- `src/data/portfolio.js` — placeholder portfolio items grouped by category.
- `src/utils/groupServices.js` — groups services by category (used by About).
- `public/brand/location-qr.png` — generated QR code for the studio's Google
  Maps location.

## Running it

```bash
npm install
npm run dev
```

## Next steps for you

1. **Portfolio images** — the `/portfolio` page currently shows placeholder
   tiles. Send over a handful of real project images per category (logos,
   branding, social media, resumes, printing, ads, photo editing, AI content)
   and I'll replace the placeholders with real previews.
2. **Testimonials** — `src/data/testimonials.js` still has placeholder
   reviews from Phase 1; send real client quotes when ready.
3. **Service pricing** — if you want prices shown on service detail pages,
   send the rates and I'll add a pricing section.

## What's next (Phase 3+)

- Backend (Express + MongoDB): auth, contact/project-request/feedback APIs,
  email notifications — this will connect the Contact form for real
- User dashboard
- Admin panel (content management, portfolio auto-scan, moderation)
- Remaining pages: Blog, Testimonials (full page), FAQ, Privacy Policy, Terms
- Final SEO pass (sitemap, robots.txt, structured data), deployment guide
