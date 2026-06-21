# Publishing Mehak Studio for Free (No Domain Required)

This guide gets your site live at **no cost**, using:
- **Frontend**: GitHub Pages → `https://adeelaftabss.github.io/mehak-studio/`
- **Backend**: Render's free tier → `https://mehak-studio-api.onrender.com`
- **Database**: MongoDB Atlas free tier

GitHub Pages only serves static files, so it can't run the Express backend
— that still needs Render (also free). Total monthly cost: **$0**.

Expect this to take about 30–40 minutes.

---

## Part 1 — Database: MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   and sign up for free.
2. Create a **free M0 cluster** (any provider/region is fine).
3. **Database Access** → Add New Database User → choose a username and a
   strong password. Give it read/write access to any database. **Save
   these credentials.**
4. **Network Access** → Add IP Address → **Allow Access from Anywhere**
   (`0.0.0.0/0`). This is safe here because the database is still
   protected by the username/password from step 3.
5. **Database → Connect → Drivers** → copy the connection string. It looks
   like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Replace `<username>` and `<password>`, and add a database name before
   the `?`:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/mehak-studio?retryWrites=true&w=majority
   ```
   **Save this full string** — this is your `MONGODB_URI`.

---

## Part 2 — Push your code to GitHub

You'll create **two separate repositories**: one for the frontend, one for
the backend.

### Backend repo

1. Go to [github.com/new](https://github.com/new). Repository name:
   `mehak-studio-backend`. Keep it **Public** (required for free GitHub
   Pages later, and fine for the backend too — your `.env` with real
   secrets is never committed, only `.env.example`). Don't initialize with
   a README (you already have one).
2. On your computer, in the `backend` folder:
   ```bash
   cd mehak-studio-website/backend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/adeelaftabss/mehak-studio-backend.git
   git push -u origin main
   ```

### Frontend repo

1. Go to [github.com/new](https://github.com/new) again. Repository name:
   **`mehak-studio`** (this name matters — it determines your URL,
   `adeelaftabss.github.io/mehak-studio/`). Keep it **Public** (required
   for free GitHub Pages). Don't initialize with a README.
2. In the `frontend` folder:
   ```bash
   cd mehak-studio-website/frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/adeelaftabss/mehak-studio.git
   git push -u origin main
   ```

> The code in this folder is already configured for the path
> `/mehak-studio/` (in `vite.config.js` and `main.jsx`). If you ever rename
> the repo, search both files for `mehak-studio` and update to match.

---

## Part 3 — Backend: Render

1. Go to [render.com](https://render.com) → sign up (GitHub sign-in is
   easiest).
2. Dashboard → **New** → **Web Service** → connect your
   `mehak-studio-backend` repo.
3. Configure:
   - **Name**: `mehak-studio-api`
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
4. Add environment variables (Environment tab):

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `CLIENT_URL` | `https://adeelaftabss.github.io` |
   | `MONGODB_URI` | Your Atlas connection string from Part 1 |
   | `JWT_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
   | `JWT_EXPIRES_IN` | `7d` |
   | `JWT_COOKIE_NAME` | `mehak_token` |
   | `ADMIN_NAME` | Your name |
   | `ADMIN_EMAIL` | Your email (your admin login) |
   | `ADMIN_PASSWORD` | A strong password (your admin login) |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASSWORD` | A Gmail [App Password](https://support.google.com/accounts/answer/185833) |
   | `EMAIL_FROM` | `"Mehak Studio <youremail@gmail.com>"` |
   | `NOTIFY_EMAIL` | Same as `ADMIN_EMAIL` |
   | `MAX_FILE_SIZE_MB` | `15` |

   > **Important**: `CLIENT_URL` must be exactly `https://adeelaftabss.github.io`
   > (no trailing slash, no `/mehak-studio`) — this is what your backend
   > checks against to allow requests from your frontend's origin.

5. Click **Create Web Service**. Wait for the first deploy to finish
   (a few minutes). You'll get a URL like
   `https://mehak-studio-api.onrender.com`. **Save this URL.**
6. Verify it's working: visit `https://mehak-studio-api.onrender.com/api/health`
   — you should see `{"status":"ok",...}`.
7. **Seed your admin user** (run this once, from your own computer, using
   your real Atlas connection string):
   ```bash
   cd mehak-studio-website/backend
   MONGODB_URI="your-atlas-connection-string" ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="yourpassword" ADMIN_NAME="Your Name" node src/utils/seed.js
   ```

> **Free tier note**: Render's free web services sleep after 15 minutes of
> no traffic and take ~30–60 seconds to wake up on the next request. This
> is normal and fine for a starting-out site.

---

## Part 4 — Frontend: GitHub Pages

The repo already includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that automatically builds and publishes
the site every time you push to `main`. You just need to turn Pages on and
tell it your backend's URL.

1. On GitHub, go to your `mehak-studio` repo → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select
   **GitHub Actions** (not "Deploy from a branch").
3. Go to **Settings** → **Secrets and variables** → **Actions** →
   **Variables** tab → **New repository variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://mehak-studio-api.onrender.com/api` (your Render
     URL from Part 3, with `/api` on the end)
4. Go to the **Actions** tab of your repo. If a workflow run isn't already
   in progress, click **Deploy to GitHub Pages** → **Run workflow** →
   **Run workflow** to trigger it manually the first time.
5. Wait for it to finish (1–2 minutes) — you'll see a green checkmark.
6. Your site is now live at:
   ```
   https://adeelaftabss.github.io/mehak-studio/
   ```

From now on, every time you `git push` to `main`, the site rebuilds and
redeploys automatically — no manual steps needed.

---

## Part 5 — Test everything end-to-end

Visit `https://adeelaftabss.github.io/mehak-studio/` and check:

- [ ] The homepage loads with images, fonts, and colors correct
- [ ] Click through a few pages (Services, About, Contact) — navigation
      works and the URL updates correctly
- [ ] **Refresh the browser** on an inner page (e.g.
      `/mehak-studio/services`) — it should reload that same page, not
      show a 404
- [ ] Submit the contact form — you should get a success message, and an
      email should arrive (give it a minute if the backend was asleep)
- [ ] Register a new account, then log in
- [ ] Submit a project request from the dashboard
- [ ] Log in with your admin credentials (from Part 3, step 4) and visit
      `/mehak-studio/admin` — you should see the admin panel with your
      test data

If the contact form or login don't work, the most common cause is a typo
in `VITE_API_URL` (frontend) or `CLIENT_URL` (backend) — double check both
match exactly what's written above.

---

## Updating the site later

```bash
# Make your changes, then:
git add .
git commit -m "Describe what changed"
git push
```

- **Frontend changes** → GitHub Actions rebuilds and redeploys
  automatically.
- **Backend changes** → push to the `mehak-studio-backend` repo; Render
  auto-redeploys.

## Moving to a custom domain later

When you're ready to buy a domain, both GitHub Pages and Render support
custom domains for free (you only pay for the domain itself, typically
$10–15/year). At that point:
- GitHub Pages: repo Settings → Pages → add your custom domain
- Render: your service → Settings → Custom Domains
- Update `CLIENT_URL` (backend) and `VITE_API_URL` (frontend) to match

The original `DEPLOYMENT.md` in this folder covers the Vercel-based path,
which is also free and works well if you'd rather use Vercel than GitHub
Pages once you're ready for a custom domain.
