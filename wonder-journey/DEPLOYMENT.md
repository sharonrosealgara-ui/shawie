# 🚀 Wonder Journey OS — Deployment Guide

How to prepare, deploy, maintain, and publish **Wonder Journey OS** — from the
current MVP to a future white-label SaaS platform.

> **Status legend**
> `✅ Live now` — works in today's build ·
> `🔜 Planned` — on the roadmap, documented here so we build toward it.

---

## 1. Current Architecture (MVP) — `✅ Live now`

Today, Wonder Journey OS is a **self-contained static web app** — no build step,
no server, no dependencies.

```
wonder-journey/
├─ index.html        # app shell + styles
├─ curriculum.js     # all World 1 content (10 adventures, badges, levels)
├─ app.js            # app logic (routing, quizzes, XP, progress, present mode)
├─ README.md
└─ DEPLOYMENT.md     # this file
```

- **Data:** saved in the browser's `localStorage` (per device). The data layer is
  deliberately isolated so it can move to Supabase later without rewriting the UI.
- **Runs anywhere:** open `index.html` locally, or host the folder on any static host.
- **No build required** for the MVP — this is the fastest path to a live URL.

## 2. Target Architecture (SaaS) — `🔜 Planned`

The production platform migrates to a framework build with accounts and a database:

| Layer | Tool |
|-------|------|
| Source control | **GitHub** |
| Hosting / CI | **Vercel** (primary) or **Netlify** |
| Framework | **Next.js** (App Router) |
| Database / Auth / Storage | **Supabase** |
| Automation | **Make.com** (workflows only — never the host) |
| Media uploads | **Cloudinary** or **Supabase Storage** |
| Custom domain | Any registrar (Namecheap, Porkbun, Google Domains, etc.) |

> ⚠️ **Make.com is for automation, not hosting.** The app is hosted on Vercel/Netlify;
> Make.com listens on webhooks and runs background workflows (emails, backups, reports).

---

## 3. Custom Domain Plan

Wonder Journey OS should live on a professional domain, for example:

- `wonderjourneyacademy.com`
- `wonderjourneylearning.com`
- `learnwithsharon.com`

The domain must support:

- 🔒 Secure **HTTPS** (automatic on Vercel & Netlify)
- 👨‍👩‍👧‍👦 **Family login** and 🧑‍🏫 **Teacher login** `🔜 Planned`
- Professional sharing with clients
- 🏷️ **White-label subdomains** per client `🔜 Planned` — e.g. `ferrell.wonderjourneyacademy.com`

### Planned route map `🔜`

```
/                     → Landing page
/login                → Family / Teacher sign-in
/family               → Family Portal (progress, badges, journal)
/teacher              → Teacher Portal (lesson prep, class controls)
/adventure-classroom  → The live lesson (present mode)
/resources            → Printables & activity downloads
/cookbook             → Family Cookbook
/storybook            → Year-end digital storybook
```

*(Today all of these live as one page navigated by the sidebar — the routes above
are the SaaS version.)*

---

## 4. Environment Variables `🔜 Planned`

Never hardcode secrets. Store these in Vercel/Netlify **Environment Variables**
(and a local `.env.local` that is **git-ignored**). Only `NEXT_PUBLIC_*` values are
exposed to the browser; everything else stays server-side.

```bash
# App
NEXT_PUBLIC_APP_URL=https://wonderjourneyacademy.com
NEXT_PUBLIC_APP_NAME=Wonder Journey OS

# Supabase (database / auth / storage)
SUPABASE_URL=
SUPABASE_ANON_KEY=            # public, safe for browser
SUPABASE_SERVICE_ROLE_KEY=    # SERVER ONLY — never expose

# Email delivery (pick one)
RESEND_API_KEY=
SENDGRID_API_KEY=
EMAILJS_PUBLIC_KEY=

# Google integrations
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_DRIVE_API_KEY=
GOOGLE_CALENDAR_API_KEY=

# Automation
MAKE_WEBHOOK_URL=

# AI (lesson helpers)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Media uploads
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Rules**
- 🚫 Never commit real keys. Commit a `.env.example` with empty values only.
- 🔑 `SERVICE_ROLE` and secret keys are used **only in server routes**, never in client code.
- ♻️ Rotate any key that is ever exposed.

---

## 5. Build Commands

### MVP (static) — `✅ Live now`
No build step. The files ship as-is. To preview locally, just open `index.html`,
or serve the folder:

```bash
# optional local static server
npx serve wonder-journey
```

### SaaS (Next.js) — `🔜 Planned`
Before every deployment:

```bash
npm install     # install dependencies
npm run lint     # catch code issues
npm run build    # production build — must pass clean
```

Fix everything before publishing:
- ❌ No broken imports
- ❌ No TypeScript errors
- ❌ No hydration mismatches
- ❌ No missing assets
- ❌ No broken routes

---

## 6. Release Checklist

Run through this before every release. Items are marked by current status.

**Core (today)**
- [ ] Opens with no console errors — `✅`
- [ ] All sidebar sections load — `✅`
- [ ] Adventure Classroom (open an adventure) works — `✅`
- [ ] Quiz scores correctly — `✅`
- [ ] Reflection saves — `✅`
- [ ] Passport, Badges, Adventure Tree update — `✅`
- [ ] Family Cookbook loads — `✅`
- [ ] Presentation / Fullscreen mode works — `✅`
- [ ] Settings: family editor, faith toggle, backup/restore — `✅`
- [ ] Responsive on mobile / tablet / desktop — `✅`
- [ ] Favicon + page metadata present — `✅`

**Planned features (verify when built)** `🔜`
- [ ] Family Portal works
- [ ] Teacher Portal works
- [ ] Morning Blessings saves
- [ ] Prayer Leader displays
- [ ] Birthday popup fires
- [ ] Parent summary generates
- [ ] Class-prep email sends
- [ ] SEO basics (sitemap, meta tags, Open Graph) configured
- [ ] Assets optimized (images, lazy-loading)

---

## 7. Hosting Guide

### Deploy the MVP today (static) — fastest path `✅`

**Vercel**
1. Push this repo to GitHub (already done: `sharonrosealgara-ui/shawie`).
2. In Vercel → **Add New → Project** → import the repo.
3. **Root Directory:** `wonder-journey`
4. **Framework Preset:** `Other` · **Build Command:** *(leave empty)* · **Output Directory:** *(leave empty / `.`)*
5. **Deploy** → you get a live `*.vercel.app` URL in ~30s.
6. **Settings → Domains** → add your custom domain and follow the DNS steps.
7. Confirm the padlock 🔒 (HTTPS is automatic).

**Netlify**
1. Push to GitHub.
2. **Add new site → Import from Git** → pick the repo.
3. **Base directory:** `wonder-journey` · **Build command:** *(empty)* · **Publish directory:** `wonder-journey`.
4. **Deploy**, then **Domain settings** → add your custom domain → verify HTTPS.

### Deploy the SaaS version (Next.js) — `🔜 Planned`
Same as above, except: **Build command:** `npm run build`, output is detected
automatically by the framework, and you add the **Environment Variables** from §4
before deploying.

---

## 8. Make.com Automation Plan `🔜 Planned`

Make.com runs the background workflows that make the platform feel alive:

- 📧 Class-prep emails to parents
- 📊 Weekly parent summaries & reports
- 🎂 Birthday reminders
- 📅 Google Calendar events
- 💾 Google Drive backups
- 🏅 Certificate delivery
- 📖 Storybook export · 🍳 Cookbook export
- 🤖 AI lesson-generation workflows

**Planned webhook endpoints** (the app POSTs to these; Make.com receives them):

```
/api/webhooks/class-prep
/api/webhooks/parent-summary
/api/webhooks/birthday
/api/webhooks/certificate
/api/webhooks/storybook
/api/webhooks/cookbook
```

**MVP fallback:** until the endpoints exist, these can be **copy-ready emails**
(pre-filled text the parent copies into their mail app) — nothing is lost before automation is wired.

---

## 9. Backup Plan

**Today `✅`:** Settings → **Export Progress (JSON)** downloads a full backup;
**Import** restores it. Do this occasionally — `localStorage` is per-browser.

**Future targets `🔜`:** Google Drive · Supabase automated backups · GitHub repo ·
local export · PDF export.

**Data worth backing up:** lessons, journal & gratitude entries, cookbook memories,
photos, projects, storybook, progress, badges, birthdays.

---

## 10. PWA Plan `🔜 Planned`

Make Wonder Journey OS installable like a real app:

- 📲 Install on tablet / desktop (Add to Home Screen)
- 📴 Offline lesson access with cached assets
- 🧩 Offline fallback activities
- 🔔 Push notifications
- 🎨 App icon set + splash screen

Requires a `manifest.json`, a service worker, and an icon set. *(The current static
build already works offline when opened locally — the PWA step makes it installable
from a live URL.)*

---

## 11. Security

Production must enforce:

- 🔒 HTTPS everywhere (automatic on Vercel/Netlify)
- 🔑 Secrets in environment variables — never in code
- 👥 **Role-based access** (family vs teacher) `🔜`
- 🛡️ Secure API routes; no exposed secrets
- 🧱 **Family data isolation** — one family can never see another's data `🔜`
- 🚧 Teacher-only pages protected `🔜`
- 🔐 Authentication (Supabase Auth) `🔜`
- ⏱️ Rate limiting on API routes `🔜`

> Note: today, each device's data is already private because it lives only in that
> browser. Cross-device accounts + true isolation arrive with Supabase.

---

## 12. Performance Targets

Aim for **Lighthouse 95+** across the board:

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

Techniques: image optimization, lazy loading, code splitting, cached assets,
reduced bundle size, and animations that respect `prefers-reduced-motion`.
*(The static MVP is already very light — no framework bundle, emoji instead of
image assets — so it scores well out of the box.)*

---

## 13. Rollback & Releases

Before any major change:
1. Commit a stable version to GitHub.
2. **Tag** important releases (`git tag v0.1.0 && git push --tags`).
3. Keep deployment history — Vercel/Netlify let you **instantly roll back** to any
   previous deploy from the dashboard.

**Release naming**

| Version | Milestone |
|---------|-----------|
| `v0.1.0` | MVP — World 1, 10 adventures, present mode `✅` |
| `v0.2.0` | Adventure Classroom polish + more worlds |
| `v0.3.0` | Family Portal + Teacher Portal (Supabase auth) |
| `v1.0.0` | First Production Release (custom domain, automation, PWA) |

---

## Deployment Principle

> Wonder Journey OS should be **easy to deploy, easy to update, easy to back up, and
> professional enough to share with real families and future clients** — starting as a
> zero-build static app today, and growing into a white-label SaaS without a rewrite.

---
*A Digital Solutions Studio project · Built with ❤️ for the Ferrell Family.*
