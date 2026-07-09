# 🚀 Wonder Journey OS — Deployment Guide

- **Version:** 1.0 · **Status:** Active · **Priority:** High

> Deployment strategy: reliable, secure, repeatable, production-ready. Wonder Journey
> should deploy **without changing application code**, and stay portable for future
> growth while V1 stays focused on the family. Governed by the
> [Constitution](../CONSTITUTION.md); complements root [DEPLOYMENT.md](../DEPLOYMENT.md).

---

## Philosophy
Deploy with confidence — every deploy tested · reproducible · secure · automated
where practical · rollback-capable · documented. Never deploy to production without
validation.

## Environments
- **Development** — daily coding, fast refresh, debugging, mock data.
- **Staging** — production-like; QA, curriculum review, teacher/parent testing, animation & performance testing.
- **Production** — live family learning: stable · optimized · secure · fast · backed up · monitored.

## Hosting
Primary: **Vercel** (or Netlify). Future: Docker · Cloud Run · Azure · AWS ·
self-hosted. Architecture stays portable. *(MVP is a static site — deploys as static
files anywhere; a live Claude Artifact serves as instant preview.)*

## Domain
Custom domain · HTTPS required · automatic SSL renewal · canonical URL · consistent
www/non-www redirect.

## Environment variables (never hardcode secrets)
Database URL · auth keys · storage credentials · email provider · Make.com webhook
URLs · analytics keys · Maps API keys · AI provider keys (future). Store only in env
vars. *(The current static MVP has no secrets.)*

## Media storage
Real educational media never relies on random external links — store in controlled
cloud/CDN/object storage (local assets for dev). Every asset carries alt text ·
caption · credit · license · fallback. *(See [Real Media Policy](../REAL_MEDIA_POLICY.md).)*

## Database *(SaaS phase)*
Migration strategy · seed data · backups · rollback · versioned schema. Never
manually edit production data.

## Backups
Daily automated backups (media · database · configuration) · documented restore ·
tested restores.

## Security
HTTPS only · secure headers · environment isolation · auth/authz · input validation ·
rate limiting · audit logging · secret management.

## Performance
Image optimization · code splitting · lazy loading · caching · compression · bundle/
animation/audio optimization. *(MVP already lazy-loads media and ships no framework.)*

## CI/CD *(future)*
GitHub Actions: build · lint · test · deploy · notifications · rollback.

## Make.com (preserve on deploy)
Email automation · certificates · birthday reminders · lesson summaries · parent
reports · calendar integrations · webhook security · retry handling.

## Pre-deployment checklist
✓ Build succeeds ✓ Tests pass ✓ Docs updated ✓ BUILD_STATUS updated ✓ CHANGELOG
updated ✓ Curriculum validated ✓ Media verified ✓ Accessibility ✓ Responsive ✓
Security review ✓ Env vars configured.

## Post-deployment checklist
Verify Teacher Portal · Family Portal · Adventure Theater · media loading · audio ·
animations · maps · Quiz Engine · Passport · Badges · Storybook · Cookbook ·
Celebrations · Parent Dashboard. No critical errors.

## Rollback plan
Stop rollout → restore previous version → restore DB/media if needed → verify →
document incident → update CHANGELOG. Never leave production unstable.

## Monitoring
Application errors · performance · media failures · API failures · auth issues ·
deployment history.

---

> Deployment is not the end of development — it is the **beginning of the family's
> experience.** Every release should feel reliable, joyful, and invisible to the family.
