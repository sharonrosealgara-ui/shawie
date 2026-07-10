# 🔌 Wonder Journey OS — API & Integration Platform

- **Version:** 1.0 · **Status:** Production architecture (SaaS phase) · **Priority:** High
- Builds on docs 25 (AI adapter) · 27–28 (identity/tenancy) · 29 (analytics) · 30 (DevOps) · [Charter](CHARTER.md)

> **Every integration optional, replaceable, and configurable — never hardcoded.**
> All third-party services connect through adapters behind one platform interface;
> swapping a provider never redesigns the application.

## Adapter categories (one interface each, pluggable backends)
| Category | Providers (initial) | Used for |
|---|---|---|
| Auth | Supabase Auth → OAuth/passkeys | logins, invitations (doc 27) |
| Email | SMTP · Resend · SendGrid · SES · Mailgun | reminders, parent summaries, certificates, onboarding, resets |
| Calendar | Google · Outlook · Apple (ICS export) | lesson scheduling, invitations, recurring sync |
| Video | Zoom · Google Meet · Teams | lesson links created in-app |
| AI | Anthropic · OpenAI · Gemini · local | doc 25's `AIProvider` interface |
| Automation | Make.com · Zapier | reminder/certificate/summary/birthday workflows |
| Storage | Supabase · Cloudinary · S3 · GCS · Azure | media library files (doc 19) |
| Maps | OpenStreetMap · Leaflet · MapLibre | interactive map scenes (licensing-permitting) |
| Payments | Stripe · PayPal · Wise · GCash · Maya | subscriptions (doc 28) |
| Notifications · Translation · Analytics | pluggable | staged |

## Platform API (SaaS)
- **Versioned from day one:** `/api/v1/…` — existing client integrations never
  break unnecessarily.
- **Import:** lessons, curriculum, media metadata, recipes, learners, teachers.
  **Export:** reports, certificates, curriculum, lesson packages, progress
  summaries. *(The MVP already defines the content contracts these move:
  adventure/quiz/recipe/media schemas + copy-ready summary text.)*
- **Webhooks:** lesson published · lesson completed · certificate generated ·
  attendance recorded · report approved — with delivery monitoring + retries.
- **Security (non-negotiable):** authn/z on every endpoint · rate limiting ·
  input validation · audit logging · **tenant isolation on every query** — no
  private organization data ever exposed.
- **Docs & observability:** auto-generated API docs (endpoints, examples, auth
  guide, version history); monitoring of response times, failures, retries, rate
  limits, webhook delivery, integration health (doc 30 dashboards).

## Already true in the MVP ✅
- Zero third-party coupling (the static app calls no external service at all).
- Adapter philosophy locked into docs 25/28/30 before any backend exists —
  the seams are designed, so no provider ever becomes load-bearing.
- Export contract v0: the Client Summary's copy-ready recap and Teacher Portal
  lesson-plan text are the exact payloads the email/automation adapters will send.

## Scale target
Thousands of organizations · millions of requests · future mobile/desktop apps ·
partner integrations · eventual public developer API.
