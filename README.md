# Antlar Elite Services — Website

A full website for **Antlar Elite Services** (Nairobi, Kenya), built with Next.js 14 +
Tailwind CSS, plus a simple password-protected admin dashboard for managing client enquiries.

## What's included

- **Public site:** Home, About, Services, Portfolio, Blog, Contact (all with the same look as
  your reference designs, rebuilt with your brand colors and Kenyan content)
- **Contact form** that saves every enquiry straight into a database
- **Quick Estimate calculator** on the Contact page (KES pricing — placeholder rates, edit freely)
- **Admin dashboard** at `/admin` — password-protected, lists every client enquiry with an
  Edit/Delete "⋮" menu per row, plus a button to add clients manually (e.g. phone bookings)
- All images are custom illustrations in your brand colors (no stock photos), so there's nothing
  to license — swap in real photos of your team whenever you're ready

## 1. Set up the database (Supabase — free)

1. Go to [supabase.com](https://supabase.com) and create a free account + new project.
2. Once it's ready, open **SQL Editor** in the left sidebar → **New query**.
3. Paste the contents of `supabase/schema.sql` (in this project) and click **Run**.
   This creates the `clients` table that stores every enquiry.
4. Go to **Project Settings → API**. You'll need two values from this page:
   - **Project URL** → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** (under "Project API keys", NOT the "anon" key) → this is your
     `SUPABASE_SERVICE_ROLE_KEY`

   ⚠️ The service role key is powerful — never put it in a public/client file. It's only ever
   read on the server in this project (API routes), which is safe.

## 2. Environment variables

Copy `.env.example` to `.env.local` for local development, and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (keep secret) |
| `ADMIN_PASSWORD` | The password you'll use to log into `/admin` |
| `ADMIN_SESSION_SECRET` | Any long random string (used to sign the login cookie) — e.g. run `openssl rand -hex 32` |

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site, and `http://localhost:3000/admin` for the dashboard.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Antlar website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## 5. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo.
2. Before deploying, open **Environment Variables** and add the same 4 variables from step 2
   (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`,
   `ADMIN_SESSION_SECRET`).
3. Click **Deploy**. Vercel will build and give you a live URL.
4. (Optional) Add your own domain under **Project → Settings → Domains**.

## Editing content

Nearly everything text-based — pricing, services, testimonials, blog posts, areas served,
company phone/email/address — lives in one file: `lib/siteData.js`. Edit it and redeploy (Vercel
redeploys automatically on every GitHub push).

Pricing in `lib/siteData.js` (`pricingPlans`) and the quick-estimate rates in
`components/sections/QuoteEstimator.js` are placeholder Kenyan Shilling amounts — update them to
match your real rates.

## Adding your real photos

The site expects 11 photos in the `public/` folder, named `1.jpg` through `11.jpg`:

| File | Used for |
|---|---|
| `1.jpg` | Home page hero photo |
| `2.jpg` | Home page "About Us" preview photo |
| `3.jpg` | Photo shown inside the open service on Services/Home |
| `4.jpg` | About page story photo **and** the repeating green "Join Hundreds of Happy Clients" banner (Footer, shown on every page) |
| `5.jpg`–`10.jpg` | The 6 Portfolio project photos, in order |
| `11.jpg` | Contact page photo |

Just drop your files into `public/` with those exact names and everything wires up
automatically. If you'd rather use different filenames, edit the `images` object at the top of
`lib/siteData.js` — that's the only place image paths are defined.

## Admin dashboard notes

- Login is a single shared password (`ADMIN_PASSWORD`) — good for a small team. If you need
  multiple admin accounts with separate logins later, that's a bigger change (real user auth),
  just let your developer know.
- Every submission from the public Contact form appears automatically with status **"new"**.
  Use the "⋮" menu to mark enquiries as contacted / booked / completed / cancelled, or delete
  them.
- To change the admin password, update `ADMIN_PASSWORD` in Vercel's Environment Variables and
  redeploy.

### Invoices

The admin dashboard has a second tab, **Invoices**, next to Clients:

- Click **New Invoice**, then either pick **Existing Client** (from your saved contacts) or
  **New / One-off Customer** and type their details in directly.
- Add as many line items as you need (description, quantity, unit price in KES) — the
  subtotal and total calculate automatically as you type.
- Save the invoice, then use the **⋮** menu on any row to **Download PDF**, **Edit**, or
  **Delete** it.
- The downloaded PDF has your logo colours, company details, itemised charges and totals —
  open it and send it to the client yourself via email, WhatsApp, etc. There's no automatic
  emailing built in.
- Invoice numbers are generated automatically (e.g. `MM-2026-0001`) and count up as you create
  more invoices.

## Project structure

```
app/                  → pages & API routes (Next.js App Router)
  admin/              → admin login + dashboard pages
  api/                → contact form, admin login/logout, client CRUD endpoints
components/           → navbar, footer, page sections, icons, illustrations
  admin/              → the clients dashboard UI
  sections/           → homepage/page sections (hero, pricing, testimonials, etc.)
lib/
  siteData.js         → all editable text content (services, pricing, testimonials, contact info)
  supabaseAdmin.js     → server-only Supabase client
  auth.js             → admin session cookie helper
supabase/schema.sql   → run once in Supabase's SQL editor to create the clients table
middleware.js         → protects /admin/dashboard from unauthenticated access
```

## Support

Built for **Antlar Elite Services** — antlareliteservices@gmail.com — P.O. Box 10, Nairobi.
