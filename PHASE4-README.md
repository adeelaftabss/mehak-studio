# Mehak Studio — Website (Phase 4: Frontend ↔ Backend Integration + Admin Panel)

This phase connects the frontend (Phases 1–3) to the real backend API and
adds the full admin panel UI.

## ⚠️ Testing status — please read

Real MongoDB wasn't available in the sandbox this was built in (no network
access to install it), so the full register → login → submit → admin-approve
flow could not be tested against the *actual* backend end-to-end. To still
verify the integration thoroughly, I built a temporary mock API server that
mirrors the real backend's exact response shapes, and tested real user flows
against it with a browser — confirmed working:

- Register → auto-login → redirect to dashboard
- Login as admin → redirect to `/admin`
- Login as regular user → blocked from `/admin`, redirected home
- Logged-out user visiting `/dashboard` → redirected to `/login`
- Auth state (name badge, dashboard/admin links) updates correctly across
  the navbar after login/register, and persists across page navigation
- Contact form → real POST → success state
- Project request submission (with file attach) → real multipart POST →
  success state, appears in admin's project list
- Admin Overview → 6 parallel stat queries all resolving and rendering
- Admin Users, Projects, Testimonials (approve/reject), Inquiries (reply),
  and Site Content (settings editor, pre-filled with real data) all tested
  and confirmed working

**What still needs testing once you have a real MongoDB connected**: the
actual persistence layer (does a submitted project really save and
reappear after a refresh, does password hashing/login work with real
bcrypt round-trips end to end, does email sending actually fire). The
backend's own README has a 15-minute checklist for this — go through it
once both servers are pointed at a real database.

## What's new in this phase

### Frontend ↔ Backend wiring
- `src/utils/api.js` — centralized fetch client (handles JSON, FormData,
  credentials, and error parsing)
- `src/context/AuthContext.jsx` — app-wide auth state (login, register,
  logout, current user), backed by the backend's httpOnly cookie session
- `src/components/ProtectedRoute.jsx` — route guard for `/dashboard` (any
  logged-in user) and `/admin` (admin role only)
- **Contact form** now posts to `POST /api/inquiries`
- **Login / Register / Forgot Password / Reset Password** now call the
  real auth endpoints (Reset Password is a new page at
  `/reset-password/:token`, matching the link sent in the password-reset
  email)
- **Dashboard** (Overview, Your Requests, Submit Request, Profile) now
  fetches and submits real data — no more mock/preview data
- **Testimonials page** now fetches approved reviews from the API and
  includes a real "Write a Review" form; falls back to the curated
  placeholder examples if the backend is unreachable or has no approved
  reviews yet, so the page is never empty
- **Portfolio page** now fetches real items from the API; falls back to
  the placeholder gallery if nothing's been added yet
- **Navbar** now reflects real auth state: shows the user's name with an
  account dropdown (Dashboard / Admin Panel / Logout) when logged in,
  "Login" when not

### Admin Panel (`/admin`, admin role required)
A full sidebar-shell admin panel with 10 sections, all wired to real API
endpoints:

| Page | What it does |
|---|---|
| Overview | Key stats (active projects, users, pending reviews, new inquiries, etc.) and recent project requests |
| Projects | View all submitted project requests, expand for details/files, update status (triggers a status-update email to the client) |
| Users | View all accounts, suspend/reactivate, delete |
| Portfolio | Trigger the folder auto-scan, upload files directly, delete items |
| Blog | Create and publish posts, toggle published/draft, delete |
| Testimonials | Approve/reject pending reviews |
| Feedback | View submissions, reply (emails the user if they have an account) |
| Complaints | View, update status (open/investigating/resolved/closed) |
| Inquiries | View contact form submissions, reply (emails the sender) |
| Announcements | Create promotions/news/updates, choose where they display (homepage/notification bar/dashboard), toggle active |
| Site Content | Edit business info, address, homepage text, about page text, and SEO meta — no code changes needed |

## Environment setup

The frontend needs to know where the backend is running. Set this in
`.env` (already included, defaults to local dev):

```
VITE_API_URL=http://localhost:5000/api
```

For production, change this to your deployed backend's URL, e.g.
`https://api.mehakstudio.com/api`.

## Running both together locally

```bash
# Terminal 1 — backend
cd mehak-studio-backend
npm install
npm run seed     # creates your admin login (see backend .env)
npm run dev

# Terminal 2 — frontend
cd mehak-studio
npm install
npm run dev
```

Then log in at `/login` with the admin credentials from the backend's
`.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) to access `/admin`.

## What's left

- Real portfolio images, testimonials, and pricing (you can now add these
  yourself through the admin panel instead of waiting on me — Portfolio →
  upload or folder-scan, Testimonials get submitted by clients and you
  approve them)
- Production deployment (frontend → Vercel/Netlify, backend → Render/
  Railway, database → MongoDB Atlas) — happy to write a full step-by-step
  deployment guide next if useful
- SEO pass: sitemap.xml, robots.txt, structured data
