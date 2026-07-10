# ☁️ Wonder Journey OS — SaaS Platform & Multi-Tenant Architecture

- **Version:** 1.0 · **Status:** Production architecture (SaaS phase) · **Priority:** Critical
- Builds on [27_IDENTITY](27_IDENTITY_USER_MANAGEMENT.md) · [23_AUTH_SECURITY](23_AUTH_SECURITY.md) · [Charter](CHARTER.md)

> **One codebase, many clients.** Every client is an **Organization** (a family, a
> tutor, a church, a school, a learning center) with its own branding, curriculum,
> lessons, users, media, reports, certificates, recipes, settings, subscription —
> completely isolated, each feeling like the platform was built exclusively for
> them. Shaun & Taylor's family is **Version 1 seed data, never architecture.**

## Already true in the MVP ✅
- **Zero hardcoded client data:** `WJ_CONFIG` (name, type, world label) + saved
  state hold everything client-specific; code uses generic terms (teacher, client,
  learner, group). Swapping clients = one config block + fresh state.
- **Config-driven content:** curriculum, recipes, media, badges, personalization
  profiles, faith settings are all data — the exact contracts a tenant database
  will store per-organization.
- **Two portals with role separation** (ADR-011) — the seam where RBAC lands.

## Tenant model (SaaS) 🔜
`Organization` owns: branding (logo, colors, fonts, mascots, portal names, splash,
favicon) · curriculum & lessons · users & groups · media library · certificates &
badges · recipes/Cooking Academy · Bible/holiday settings · languages · calendar &
timezone · automation · subscription/limits · reports. **Hard isolation** via
row-level security; cross-org sharing only by explicit opt-in (e.g., purchased
marketplace worlds).

## Platform capabilities (staged)
- **Custom domains & white-label:** `learn.client.com` / `client.wonderjourney.com`,
  custom SSL, full de-branding on qualifying plans.
- **Org admin dashboard:** teachers, learners, groups, lessons, media, branding,
  automation, billing, storage/usage, security.
- **Multi-curriculum:** each org builds its own courses (Filipino culture, ESL,
  science, Bible, cooking, custom) on the World Engine contracts (doc 22).
- **Pluggable providers** (no hardcoding): storage (Supabase/S3/GCS/Azure/
  Cloudinary) · billing (Stripe/PayPal/Wise/GCash/Maya/invoice) · email ·
  automation (Make.com first) · AI (doc 25) · video · calendar · analytics.
- **Subscriptions & limits:** plan tiers (Free → Enterprise; Family/Church/School/
  Center) toggle features and quotas (teachers, learners, storage, AI credits)
  via configuration, never code.
- **Onboarding wizard:** org type → branding → curriculum → theme → portal names →
  timezone/language → invite teachers/learners → import lessons.
- **Import/export & backups:** lesson/curriculum/media/roster import; report/
  progress/certificate export; automated backups, restore points, org export
  (disaster recovery per [13_DEPLOYMENT_GUIDE](13_DEPLOYMENT_GUIDE.md)).
- **Deployment modes:** single SaaS · self-hosted · private · white-label ·
  enterprise · Docker/cloud.

## Analytics (per-org only)
Learners, attendance, lessons completed, certificates, cooking & passport
progress, media/storage usage, engagement, quiz performance — never crossing
organization boundaries, never overwhelming teachers (doc 26's reporting rule).

## Quality bar
Every feature: modular · reusable · secure · accessible · maintainable · scalable ·
commercially viable. The goal: thousands of independent organizations on one
maintainable codebase, each with a premium, exclusive-feeling educational
experience — **no major redesigns required to get there** (contracts already live
in the MVP).
