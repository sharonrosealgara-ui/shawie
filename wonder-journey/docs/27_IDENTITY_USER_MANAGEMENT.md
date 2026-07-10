# 🪪 Wonder Journey OS — Identity, Authentication & User Management

- **Version:** 1.0 · **Status:** Production architecture (SaaS phase) · **Priority:** Critical
- Extends [23_AUTH_SECURITY](23_AUTH_SECURITY.md) · Governed by the [Charter](CHARTER.md) · ADR-011

> Secure, multi-tenant identity for families, teachers, schools, churches, learning
> centers, and commercial clients — modular, scalable, privacy-by-design. **V1:**
> the family is ONE client organization stored as configurable data (`WJ_CONFIG` +
> state), never hardcoded; the static MVP keeps all data on-device (no accounts —
> the strongest privacy posture until SaaS).

## Roles (RBAC)
Platform Owner · Super Admin · Organization Admin (school/church/center variants) ·
Teacher · Teaching Assistant · Parent/Guardian · Student · Guest · Trial · future
API/Developer. Two portals remain the only surfaces; roles gate features **on the
server**, never by UI visibility alone.

## Multi-tenancy
Each organization owns its logo, colors, theme, domain (future), curriculum, media
library, certificates, users, lessons, reports, settings — with **hard isolation**
(row-level security; one org can never read another's data). Learner records
(age, progress, passport, storybook, cookbook, XP) belong to the organization.

## Authentication
Email+password at launch (strong hashing, reset/change, lockout after failures,
session timeout); magic links, Google/Microsoft/Apple, passkeys, and MFA staged
next. Children never hold their own credentials — guardian-owned accounts.

## Profiles & relationships
User: name, display name, avatar, role, org, language, timezone, accessibility/
learning/theme/notification preferences. Family graph: parent, child, sibling,
guardian, grandparent, invited members. Invitations via email/link (org, parent,
teacher, student).

## Sessions, permissions & audit
Remember-me, secure sessions, device tracking, logout-everywhere, expiration.
Every feature checks permissions server-side. Audit log: login/logout, lesson
create/edit/publish, uploads, role changes, password changes, org settings, admin
actions.

## Commercial layers (staged)
Subscriptions (Free → Enterprise; Family/Church/School/Center plans) upgradable
without code changes · billing (Stripe, PayPal, GCash, Maya, Wise, invoicing) ·
notifications (email, in-app; push/SMS future) · org customization (logo, colors,
certificates, badges, curriculum, email templates, portal branding).

## Privacy & security (non-negotiable)
Minimal data · account deletion + data export · parental consent where required ·
encrypted transport/storage · CSRF/XSS protection · input & file validation · rate
limiting · never expose sensitive data. Accessibility applies to auth flows too.

## Testing matrix
Registration/login/logout/reset · role permissions per portal · **organization
isolation** · session expiry · media permissions · accessibility · multi-org security.
