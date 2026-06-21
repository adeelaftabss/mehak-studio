# Mehak Studio — Deployment Guide

This guide walks through putting the full website live: database, backend
API, and frontend. Total cost to start: **$0/month** using free tiers
(upgradeable later as traffic grows). Expect this to take 45–60 minutes the
first time.

You'll deploy three pieces:
1. **Database** — MongoDB Atlas (free tier)
2. **Backend** — Render (free tier)
3. **Frontend** — Vercel (free tier)

---

## Before you start

You'll want:
- A GitHub account (both Render and Vercel deploy by connecting to a Git
  repo — this is by far the easiest path, and means future updates auto-deploy)
- The `mehak-studio` (frontend) and `mehak-studio-backend` folders, each
  pushed to their own GitHub repository

### Pushing each folder to GitHub

If you haven't already, for **each** folder:

```bash
cd mehak-studio          # (repeat for mehak-studio-backend)
git init
git add .
git commit -m "Initial commit"
```

Then create a new empty repository on [github.com/new](https://github.com/new)
for each (e.g. `mehak-studio-frontend` and `mehak-studio-backend`), and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mehak-studio-frontend.git
git branch -M main
git push -u origin main
```

---

## Step 1 — Database: MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   and create a free account.
2. Create a new **free (M0) cluster** — any cloud provider/region is fine;
   pick one close to where your backend will run (e.g. AWS, a region near
   South Asia if available, otherwise the nearest to your Render region).
3. **Create a database user**: Database Access → Add New Database User.
   Choose a username and a strong password (save these — you'll need them
   in a moment). Give it "Read and write to any database."
4. **Allow network access**: Network Access → Add IP Address → "Allow
   Access from Anywhere" (`0.0.0.0/0`). This is fine for this setup since
   the database itself is still protected by the username/password —
   Render's servers don't have fixed IPs on the free tier, so this is the
   simplest reliable option.
5. **Get your connection string**: Database → Connect → Drivers → copy the
   string, which looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Replace `<username>` and `<password>` with what you created in step 3,
   and add a database name before the `?`, e.g.:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/mehak-studio?retryWrites=true&w=majority
   ```
   **Save this full string** — it's your `MONGODB_URI`.

---

## Step 2 — Backend: Render

1. Go to [render.com](https://render.com) and sign up (you can sign in with
   GitHub directly, which makes the next step easier).
2. Dashboard → **New** → **Web Service**.
3. Connect your `mehak-studio-backend` GitHub repo.
4. Configure:
   - **Name**: `mehak-studio-api` (or anything you like)
   - **Region**: pick one close to your Atlas cluster
   - **Branch**: `main`
   - **Root Directory**: leave blank (the backend is the whole repo)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Before clicking "Create Web Service," add your environment variables
   (Environment tab, or you can add them after creation under
   **Environment**). Copy every key from `.env.example` and fill in real
   values:

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` (Render sets its own external port automatically, but the app needs *a* value here) |
   | `CLIENT_URL` | Your frontend's URL — you'll get this in Step 3. For now use a placeholder like `https://mehakstudio.vercel.app` and come back to update it. |
   | `MONGODB_URI` | The connection string from Step 1 |
   | `JWT_SECRET` | A long random string — generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
   | `JWT_EXPIRES_IN` | `7d` |
   | `JWT_COOKIE_NAME` | `mehak_token` |
   | `ADMIN_NAME` | Your name |
   | `ADMIN_EMAIL` | Your email (this becomes your admin login) |
   | `ADMIN_PASSWORD` | A strong password (this becomes your admin login) |
   | `SMTP_HOST` | `smtp.gmail.com` (or your provider) |
   | `SMTP_PORT` | `587` |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASSWORD` | A Gmail [App Password](https://support.google.com/accounts/answer/185833) — not your regular password |
   | `EMAIL_FROM` | `"Mehak Studio <youremail@gmail.com>"` |
   | `NOTIFY_EMAIL` | Where you want contact-form/project notifications sent — usually the same as `ADMIN_EMAIL` |
   | `MAX_FILE_SIZE_MB` | `15` |

6. Click **Create Web Service**. Render will build and deploy — this takes
   a few minutes. Once it's live, you'll get a URL like
   `https://mehak-studio-api.onrender.com`.

7. **Seed your admin user**: Render's free tier doesn't give you direct
   shell access easily, so the simplest approach is to run the seed script
   once locally, pointed at your production database:
   ```bash
   cd mehak-studio-backend
   # Create a temporary .env.production with your real MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD
   MONGODB_URI="your-atlas-connection-string" ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="yourpassword" ADMIN_NAME="Your Name" node src/utils/seed.js
   ```
   This connects directly to Atlas and creates your admin user, default
   settings, and all 21 services — independent of where the backend itself
   is hosted.

8. **Verify it's working**: visit `https://your-render-url.onrender.com/api/health`
   in your browser — you should see `{"status":"ok",...}`.

> **Note on Render's free tier**: free web services "spin down" after 15
> minutes of inactivity and take ~30–60 seconds to wake up on the next
> request. This is fine for a low-traffic site starting out, but if it
> matters for your launch, Render's $7/month "Starter" tier keeps it always
> on.

---

## Step 3 — Frontend: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up (again, GitHub sign-in
   is easiest).
2. Dashboard → **Add New** → **Project**.
3. Import your `mehak-studio` (frontend) GitHub repo.
4. Vercel auto-detects Vite — the defaults should already be correct:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Before deploying, add an environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-render-url.onrender.com/api` (the backend URL
     from Step 2, with `/api` on the end)
6. Click **Deploy**. After a minute or two, you'll get a live URL like
   `https://mehak-studio.vercel.app`.

7. **Connect your custom domain** (optional but recommended): Project →
   Settings → Domains → add `mehakstudio.com` (or whatever you've
   registered) and follow Vercel's DNS instructions. This usually means
   adding an `A` or `CNAME` record at your domain registrar.

---

## Step 4 — Connect the two

Now that both are live, go back and fix the placeholder:

1. In **Render** (backend) → Environment → update `CLIENT_URL` to your real
   Vercel URL (or custom domain), e.g. `https://mehakstudio.com`. This is
   what makes CORS work correctly — without it, the browser will block
   requests from your frontend.
2. Save — Render will automatically redeploy with the new value.
3. If you added a custom domain in Vercel, also update `VITE_API_URL` if
   your backend domain changes, and any hardcoded `SITE_URL` references —
   see "Final checklist" below.

---

## Final checklist before going fully live

A few things in the code reference placeholder URLs that need a one-time
update to your real domain:

- [ ] `mehak-studio/src/components/seo/SEO.jsx` — update `SITE_URL` at the
      top to your real domain
- [ ] `mehak-studio/src/components/seo/structuredData.js` — same, update
      `SITE_URL`
- [ ] `mehak-studio/scripts/generate-sitemap.js` — same, update `SITE_URL`
- [ ] `mehak-studio/public/robots.txt` — update the `Sitemap:` line to your
      real domain
- [ ] `mehak-studio/index.html` — update the `og:image` / `twitter:image`
      URLs to your real domain

After updating these, commit and push — Vercel will auto-redeploy.

- [ ] Test the full flow on the live site: register an account, submit a
      contact form, submit a project request, then log in as admin and
      confirm everything appears correctly and email notifications arrive
- [ ] Submit your sitemap to [Google Search Console](https://search.google.com/search-console)
      (Add Property → your domain → Sitemaps → submit `sitemap.xml`)
- [ ] Run your live site through [PageSpeed Insights](https://pagespeed.web.dev/)
      and [Google's Rich Results Test](https://search.google.com/test/rich-results)
      to confirm the structured data is being picked up correctly

---

## Ongoing updates

Both Render and Vercel auto-deploy whenever you push to the `main` branch
of the connected GitHub repo. To update the live site:

```bash
git add .
git commit -m "Describe your change"
git push
```

That's it — no manual redeployment needed.

## Costs as you grow

- **MongoDB Atlas M0 (free)**: 512MB storage — plenty to start. Upgrade to
  a paid shared cluster (~$9/month) when you outgrow it.
- **Render free tier**: fine for low traffic; ~$7/month removes the
  spin-down delay.
- **Vercel free tier**: generous for most small business sites; you're
  unlikely to need to pay unless traffic gets very high.

Realistic total once you want everything always-on and fast: **roughly
$15–20/month**, only once the business has grown enough to justify it.
