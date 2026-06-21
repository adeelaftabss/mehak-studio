# Mehak Studio — Website (Phase 3: Remaining Frontend Pages)

All site pages from the original spec are now built (no more "Coming Soon"
placeholders). This phase adds:

## New pages

- **FAQ** (`/faq`) — accordion-style Q&A grouped by topic (Getting Started,
  Pricing & Payment, Turnaround & Revisions, Languages & Formats, Visiting &
  Support). Edit `src/data/faq.js`.
- **Privacy Policy** (`/privacy-policy`) and **Terms & Conditions** (`/terms`)
  — full draft content tailored to a Pakistan-based creative/career services
  studio. Edit `src/data/legal.js`. *(Note: this is a starting template, not
  legal advice — consider having a legal professional review before
  publishing.)*
- **Testimonials** (`/testimonials`) — full reviews grid (still placeholder
  content from `src/data/testimonials.js`) plus a "share your experience"
  CTA.
- **Blog** (`/blog`) — listing page with category filters, plus
  **`/blog/:slug`** detail pages. Includes 4 original articles relevant to
  your services (ATS resume tips, branding mistakes, choosing print
  materials, social media planning) — edit/add more in `src/data/blog.js`.
- **Login / Register / Forgot Password** (`/login`, `/register`,
  `/forgot-password`) — fully designed auth forms with client-side
  validation. Submission shows a clear "not connected yet" notice — these
  will call the real auth API once the backend exists (TODO comments mark
  exactly where).
- **Dashboard** (`/dashboard`) — tabbed preview (Overview, Your Requests,
  Submit Request, Profile) using sample data, clearly marked as a preview.
  The "Submit Request" form already has the full UI (service dropdown from
  your 21 services, deadline, budget, file attach) ready to wire up.

## New shared components

- `src/components/ui/Accordion.jsx` — used by FAQ
- `src/components/ui/AuthField.jsx` — dark-themed input for auth pages
- `src/components/ui/BlogCard.jsx` — blog post preview card
- `src/pages/AuthLayout.jsx` — shared layout for Login/Register/Forgot
- `src/pages/LegalPage.jsx` — shared layout for Privacy/Terms

## Running it

```bash
npm install
npm run dev
```

## Status check — original spec coverage

All public pages, the user dashboard UI, and auth UI are now built. What
remains from the original spec is backend infrastructure:

- Express + MongoDB API (auth, contact form, project requests, feedback,
  testimonials, blogs, announcements)
- Admin panel
- Portfolio auto-scan system
- Email automation (Nodemailer)
- Connecting the Contact form, Dashboard, and auth pages to real data

## Still pending from you (whenever convenient)

- Real portfolio images (by category)
- Real testimonials
- Service pricing (if you want it displayed)
