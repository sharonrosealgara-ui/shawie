# 👩‍🏫 Wonder Journey OS — Teacher Portal

- **Version:** 1.0 · **Status:** Active (core live) · See ADR-011 (two portals)

> The private, administrative portal. Powerful for the teacher; invisible to
> learners. The Student/Client Portal never shows any of these tools.

## Live today ✅
- **Lesson Plans** — all 72 adventures as expandable plans: objective, woven
  subjects (Language/Math/Science & Culture/Bible/Value), materials & ingredient
  kits, per-child activities, copy-to-clipboard plan, Open Adventure.
- **Client Summary** — progress ring + stats, upcoming-lesson preview, weekly
  materials prep list, copy-ready after-class recap.
- **Media Library manager** — search/filter all assets, previews, license/credit.
- **Teacher Mode** (Settings toggle) — in-lesson timer + quiz answer key; hidden
  from Family View.
- **Birthday manager** (Settings roster) · **progress tracking** (state) ·
  **branding config** (`WJ_CONFIG`).

## Roadmap 🔜 (SaaS phase unless noted)
Visual Curriculum/Lesson Builder · Quiz Builder · Adventure Theater presenter view
(separate teacher screen with notes/timer driving the client display) · student/
client & group management · attendance · uploads manager (photos/videos/worksheets)
· Cooking Academy/Storybook/Cookbook/Celebration managers · reports · Make.com
automation settings · deployment settings · real role-based logins
([23_AUTH_SECURITY](23_AUTH_SECURITY.md)).

## Rules
Teacher tools are **never** rendered in learner-facing views; on a shared device,
gating = the Teacher Portal nav group + Teacher Mode toggle (MVP), real auth in SaaS.
