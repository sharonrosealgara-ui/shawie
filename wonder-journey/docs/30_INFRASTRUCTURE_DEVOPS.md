# 🏗️ Wonder Journey OS — Deployment, Infrastructure & DevOps

- **Version:** 1.0 · **Status:** Production architecture · **Priority:** Critical
- Complements [13_DEPLOYMENT_GUIDE](13_DEPLOYMENT_GUIDE.md) · builds on docs 22–23, 25–29 · [Charter](CHARTER.md)

> Build like a real software company: deployment simple, updates safe,
> infrastructure scalable — enterprise practices kept approachable for an
> independent developer today and a growing agency tomorrow.

## Live today ✅ (V1 static deployment)
- **Zero-infrastructure deploy:** dependency-free static app → Netlify
  (`netlify.toml` committed; publish dir `wonder-journey`, no build) or Vercel
  (`vercel.json`); auto-redeploy on push from GitHub. Live artifact = instant
  preview channel.
- **No secrets exist** in V1 (no server, no keys) — nothing to leak.
- **Quality gates in practice:** syntax compile + Playwright behavior/visual
  regression on every change; honest error handling (resilient media, graceful
  fallbacks, no broken states); CHANGELOG/BUILD_STATUS discipline per session.
- **Repo standards:** README, CHANGELOG, CONTRIBUTING, docs/ (00–30), tools/,
  PROGRESS tracker. *(LICENSE, SECURITY.md, CODE_OF_CONDUCT — add at
  commercialization; license choice is an owner/business decision.)*

## Target stack (SaaS) 🔜
**Frontend** Next.js + React + TypeScript + Tailwind · **Backend** Next.js server
actions/API routes (Node) · **DB** PostgreSQL via Supabase (migrations, versioning,
rollback, seeds, tenant isolation via RLS) · **Auth** Supabase Auth → OAuth/passkeys
· **Storage** Supabase Storage (→ Cloudinary/S3/GCS/Azure adapters) · **Deploy**
Vercel (recommended) / Netlify / Docker / self-hosted.

## Environments & config
Dev · Testing · Staging · Production — each with its own env vars, database,
storage, keys, logging; never mixed. All secrets in env vars only (DB URL, API/
storage/OAuth/email/payment/analytics/encryption/AI keys).

## CI/CD
GitHub → PR → tests (unit, integration, E2E, **accessibility**, performance,
security, regression) → build → deploy → verify → production; failed deploys
auto-rollback. ESLint + Prettier + TS strict.

## Reliability
- **Backups:** automatic (DB, media, lessons, orgs, users, settings, keepsakes,
  progress); point-in-time & per-organization restore; tested disaster recovery.
- **Logging:** structured (auth, errors, uploads, publishing, automation, API,
  permission changes) — never sensitive data. Friendly user-facing errors; stack
  traces only in logs.
- **Monitoring/observability:** system/DB health, storage & AI usage, failed
  jobs, API/page performance, deploy history — admin dashboards.

## Provider-agnostic seams (never tightly coupled)
AI (Anthropic/OpenAI/Gemini/local — doc 25 adapter) · email (Resend/SendGrid/SES/
SMTP/Mailgun) · payments (Stripe/PayPal/Wise/GCash/Maya/invoice) · integrations
(Google Calendar/Drive/Classroom, Zoom, Teams, Calendly, Slack, Notion, Make.com,
Zapier).

## Scale & offline
Horizontal scaling, background workers, queues, scheduled jobs; thousands of orgs,
millions of lessons/assets; future microservices only if required. Offline: PWA
lesson caching, offline progress, background sync (the static V1 is already
offline-friendly by nature).

## Non-negotiables
HTTPS · secure cookies · CSRF/XSS protection · rate limiting · input validation ·
secure uploads · RBAC · encryption · accessibility preserved through every deploy
(and tested in CI) · documentation maintained (architecture, infra, env setup,
schema, API, components).

> **Final goal:** a new organization launches quickly, developers contribute
> confidently, updates are boring (in the best way), and the platform stays
> secure, observable, and maintainable for the long haul.
