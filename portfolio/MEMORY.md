# PROJECT MEMORY — Sharon Rose · Digital Solutions Studio

> **This file is the durable memory of the project.** Chat history may be trimmed between
> sessions; this file is not. Read it at the start of every session (CLAUDE.md forces this),
> and UPDATE it whenever a meaningful decision is made, a page is added/changed, or a task
> is finished. Treat it as the single source of truth for "what have we done and why."

_Last updated: 2026-07-05_

---

## 1. What this project is
A multi-page **static portfolio website** for **Sharon Rose** (freelance / contract), branded
**Digital Solutions Studio**. It showcases live, interactive project builds (websites, admin
consoles, AI assistants, etc.) as a body of work to win freelance clients.

- **Entry point:** `index.html` → redirects to **Portfolio Hub.dc.html** (also declares hidden
  Netlify Forms for deploy-time detection).
- **Deploys as-is** (static HTML + `support.js` + `assets/`). See `DEPLOY.md` for Netlify /
  GitHub Pages / WordPress instructions.
- Pages are **Design Components** (`*.dc.html`) that link to each other by filename.

## 2. Brand system (do not drift from this)
- **Palette:** cream `#f4ede3` / `#eadfce` · ink `#211a13` · gold `#9c6a34` (deep caramel) ·
  rose accent `#bd6980` · muted `#665648`.
- **Type:** Cormorant Garamond (headings, 600) + Jost (body, 400). Great Vibes for script
  accents (wedding invite only).
- Rich contrast — never pale tan-on-cream. Keep it warm, luxury, editorial.
- Per-project sites may use their OWN palette (e.g. Lumina Dental = teal, Verde Realty =
  green, BrewBloom = coffee browns) — the Sharon-Rose brand applies to the Hub + Portfolio.
- Full standing rules live in `CLAUDE.md` (image quality, no blurry placeholders, etc.).

## 3. Real, wired integrations (already live)
- **n8n inquiry webhook** — URL is set in `shawie-config.js`:
  `https://sharonalgara.app.n8n.cloud/webhook-test/shawie-Inquiry` (this is a TEST url — one-shot,
  only accepts a request while the workflow is "listening" in the n8n editor). Live POST from the
  preview returned `Failed to fetch` = n8n not armed AND/OR CORS not allowed. TO GO LIVE: (a) in the
  Webhook node → Options → **Allowed Origins (CORS)** set `*`; (b) **Activate** the workflow and
  switch config to the **Production** URL `/webhook/shawie-Inquiry` (drop `-test`). The website side
  is complete — reads URL from config, POSTs JSON, handles success/error.
- **WhatsApp:** `wa.me/639369037613`
- **Calendly:** `calendly.com/sharonrosealgara/30min`
- **Email:** `sharonrosealgara@gmail.com`
- **Netlify Forms** (declared hidden in `index.html`, auto-detected on Netlify deploy):
  `shawie-signup`, `password-reset`, `contact`, `booking`, `order`, `viewing`, `rsvp`,
  `payment`. Fallback before deploy = pre-filled `mailto:`.

## 4. Page inventory

### Portfolio Hub (the front door)
- **Portfolio Hub.dc.html** — landing/hub. Hero, **Work grid (14 projects)**, capabilities,
  About, Work Experience, Services & Pricing, Toolkit, Contact. Warm/dark theme toggle.
  Project cards are defined in the logic class `PROJECTS = [...]`. **To add a project to the
  site, add a card object there** (`href`, `cap` for SVG fallback, `img`, `kicker`, `role`,
  `title`, `desc`, `tags`).

### Featured projects (all 14, in Hub Work grid order)
1. **Portfolio.dc.html** — Digital Solutions Studio (flagship agency site).
2. **Shawie Bakes and Events.dc.html** — luxury events platform (AI gallery, booking, demo center).
3. **Shawie Admin.dc.html** — Shawie admin/ops console (analytics, CRM, payments, n8n logs).
4. **Studio Admin.dc.html** — Sharon's own studio ops console (CRM, payments, proposals).
5. **Shawie Messenger.dc.html** — Facebook Messenger AI chatbot console.
6. **Shawie Portal.dc.html** — client portal (timeline, GCash/Wise pay, contracts, messaging).
7. **Studio AI Assistant.dc.html** — multi-mode AI concierge w/ live Claude chat.
8. **Studio Email Templates.dc.html** — 11 branded transactional email templates.
9. **Shawie Blog.dc.html** — CMS editorial blog (filter, search, overlays, newsletter).
10. **BrewBloom Admin.dc.html** — café ops console (order queue, sales, loyalty, GCash).
11. **Verde Realty.dc.html** — real-estate platform (search, filters, favorites, listings). Green.
12. **Lumina Dental.dc.html** — dental clinic site (services+pricing, dentists, booking, GCash). Teal.
    _Added to Hub 2026-07-05 (was previously orphaned/unlinked)._
13. **BrewBloom Coffee.dc.html** — coffee brand site (ordering cart, GCash checkout, loyalty).
14. **Canva Wedding Invitation.dc.html** — interactive tap-to-open invitation guide.

### Support / secondary pages (NOT in the Work grid — reachable within flows)
- **Shawie Auth.dc.html** — sign-up + password reset (wired to Netlify Forms).
- **Shawie Architecture.dc.html** — system architecture diagram/explainer.
- **canva-steps.html** — helper/steps page for the Canva invitation guide.

### Bundles / exports
- **Sharon Rose - Portfolio.html** — single-file standalone bundle of the Hub (for WordPress
  embed etc.). ⚠️ May go stale after Hub edits — re-bundle when the Hub changes materially.

## 4b. SHAWIE OS integration layer (reusable)
- **`shawie-config.js`** — the ONE file to edit. `n8nWebhookUrl` (inquiry POST, currently set to
  the TEST url), `endpoints:{inquiries,bookings,payments,clients,email}` (blank = module uses demo
  data), `contact:{}`. No tokens ever — they stay in n8n.
- **`shawie-data.js`** — `window.ShawieData`: reusable client for every back-office module.
  `getInquiries()` (normalised to CRM lead shape `{id,name,event,when,value,stage}`),
  `getBookings/getPayments/getClient`, `submitInquiry(payload)`. Timeout + try/catch on all;
  every method returns data OR `null` → caller falls back to demo data. No throwing into UI.
- **Wired so far:** `Shawie Bakes and Events.dc.html` (inquiry form → n8nWebhookUrl) and
  `Shawie Admin.dc.html` (CRM Pipeline → `ShawieData.getInquiries()` on mount, demo fallback,
  drag-to-stage preserved via `S.crm`). Both load config+data in their helmet. UI unchanged until
  an endpoint is set. Pattern to repeat for Portal/bookings/payments/email (Phases 4–6).

## 5. Assets
- `assets/` — Sharon portraits (`sharon-portrait.jpg`, `sharon-portrait-2.jpg`),
  `assets/photos/*` (p08, p09, p13, p26…), `assets/brew/*` (BrewBloom imagery).
- Many project card covers use Pexels URLs (compressed, w=900).
- `design_handoff_shawie/` — handoff bundle incl. its own `support.js`.
- `fb/`, `screenshots/`, `uploads/` — misc.
- `support.js` — DC runtime (never edit/author this).

## 6. Open threads / TODO
- [ ] **n8n webhook URL for Shawie inquiry form** — form now POSTs JSON with ALL 13 fields
      (drawer extended with Email/Phone/Facebook/Event Time/Venue/Guests/Budget, styled with the
      existing `.field` pattern; reads by `data-field`; full validation + Sending/success/error).
      URL is still a PLACEHOLDER — user must paste real URL into `N8N_WEBHOOK_URL` (top of logic
      class). Success detection needs CORS headers on the webhook.
- [ ] **Re-bundle `Sharon Rose - Portfolio.html`** — currently predates recent Hub edits
      (incl. the Lumina card). Do when the user wants an up-to-date standalone.
- [ ] Consider whether **Shawie Architecture** / **Shawie Auth** should be surfaced anywhere
      in the Hub or left as in-flow pages (currently in-flow only — intentional for now).

## 6b. Strategic recommendations (senior-team review, 2026-07-05)
1. Switch test→production webhook (`/webhook/shawie-Inquiry`, workflow Activated, CORS `*`).
2. One normalised Airtable base: Inquiries→Clients→Bookings→Payments + EmailLog + AutomationLog.
3. n8n is the ONLY backend; add a shared-secret header so webhooks aren't world-writable; PAT stays in n8n.
4. Anti-spam/idempotency on inquiries (honeypot, rate-limit, dedupe by email+date).
5. AI step (Phase 2) runs in n8n → returns {category,priority,sentiment,draftReply} → Airtable → Gmail.
6. Add auth before Admin/Portal load real data (magic-link / password).
7. Analytics + SEO: GA4, Search Console, per-page title/meta/OG, sitemap.
8. Deploy on Netlify now (forms already declared) for a real CORS origin + mobile testing.
9. Make AutomationLog real (success/retry/fail) so failures are visible.
10. Re-bundle standalone only after Hub stabilises.

## 7. Log of notable changes
- **2026-07-05** — Added **Lumina Dental Studio** card to Portfolio Hub Work grid (was built
  but unlinked). Created this MEMORY.md + CLAUDE.md pointer so context survives chat trimming.
- **2026-07-05** — Built **Studio AI Automation.dc.html** (Airtable AI-automation showcase with
  live run-it-yourself demo) + added its Hub card. Fixed its run button (exposed `run` in renderVals).
- **2026-07-05** — **SHAWIE OS Phase 1 (inquiry pipeline UX)** on `Shawie Bakes and Events.dc.html`:
  rewired inquiry drawer submit from mailto → POST JSON to n8n; extended drawer to all 13 fields
  (added Email/Phone/Facebook/Event Time/Venue/Guests/Budget in the existing `.field` style);
  read by `data-field`; added validation (name, valid email, event type), Sending/success/error
  states, and an elegant on-brand **success modal** (gold tick, personalised). Verified end-to-end
  with a stubbed webhook. STILL PENDING: user's real `N8N_WEBHOOK_URL` + Airtable field names.
  Roadmap Phases 2–6 (AI on inquiry, Admin/Portal live data, booking/payments, real email) are
  approved ("EVERYTHING") but need those credentials to go live.

---
_When you finish a task or make a decision, append a line to §7 and update the relevant
section above. Keep this file current — it is how the next session remembers._
