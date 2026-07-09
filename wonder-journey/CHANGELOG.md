# 📓 Changelog — Wonder Journey OS

All notable changes to Wonder Journey OS are recorded here.
Format follows [Keep a Changelog](https://keepachangelog.com) and
[Semantic Versioning](https://semver.org) — **MAJOR.MINOR.PATCH**.

**Change types:** `Added` · `Changed` · `Improved` · `Fixed` · `Removed` ·
`Deprecated` · `Performance` · `Security` · `Accessibility` · `Documentation` ·
`Automation` · `Deployment`.

> Entries below marked with a date are **released** (in the repo & live artifact).
> The **[Unreleased]** section lists what's planned next.

---

## [Unreleased] — Planned

**Family Experience**
- 🎂 Birthday Celebrations (configurable birthdays + warm pop-up)
- 🗓️ Memory Timeline (adventures + gratitude + celebrations in one history)
- 🖼️ Family Gallery

**Teacher Experience**
- 📊 Parent Summary (weekly recap, copy-ready email)
- 🧑‍🏫 Full Teacher Portal (separate from Family Portal, with logins)
- 🤖 AI Lesson Generator · Participation Tracker · Presenter Notes

**Automation & Platform**
- 🔌 Make.com workflows · email automation · Google Calendar · Drive backup
- 🗄️ Supabase backend (accounts, cross-device sync, family data isolation)
- 📲 PWA (installable, offline mode)
- 🌏 World 2 (new country/theme) · Adventure Replay
- 🏷️ White-label & curriculum marketplace · multiple teachers/families/languages

---

## [0.7.0] — 2026-07-08 · Birthdays & Learning Levels

**Summary:** Personalized celebrations and per-child learning levels.

- `Added` **Birthday Celebrations** — configurable birthdays in the family editor, a joyful pop-up on the day (shown once), and an **Upcoming Birthdays** card on Home Base.
- `Added` Per-child **learning levels** — Rylee (Trailblazer), Ezra & Asa (Adventurer), Selah (Explorer) — now shown on their matching Missions cards inside every adventure.
- `Documentation` Added `PEDAGOGY.md` (educational philosophy, screen-time cadence, level ladders, positive-education standards).
- `Improved` Safe migration backfills learning levels for known children in older saved rosters.

---

## [0.6.0] — 2026-07-08 · Age-Appropriate Differentiation

**Summary:** Every adventure now supports siblings of different ages learning together.

- `Added` **"Missions for Every Explorer"** in each adventure — three leveled task cards (🌱 Explorer 7–8 · 🌿 Adventurer 9–10 · 🔥 Trailblazer 11–12), same objective, different difficulty.
- `Added` `LEVEL_MISSIONS` data (3 tiers × 10 adventures) and `LEVEL_TIERS` in `curriculum.js`.
- `Documentation` Added `AGE_FRAMEWORK.md` (age groups, per-subject differentiation, content-review checklist).
- `Improved` Encourages teamwork — older children help younger siblings.

---

## [0.5.0] — 2026-07-08 · Teacher Experience

**Summary:** Introduced Teacher Mode so Sharon gets teaching tools while the family
keeps a clean, distraction-free view.

- `Added` **Teacher Mode** toggle (Settings → Teacher Tools).
- `Added` Per-lesson **timer** (start / pause / reset) inside adventures.
- `Added` Teacher-only **quiz answer key**.
- `Added` Teacher tip banner in the Adventure Classroom.
- `Security` Enforced role separation — teacher extras are hidden unless Teacher Mode is on; the family view stays clean.
- `Fixed` Timer stops automatically on navigation (no stray intervals).

---

## [0.4.0] — 2026-07-08 · Family Experience

**Summary:** Personalized the app for the Ferrell family and added memory-centered
rituals and a keepsake.

- `Added` **Morning Blessings** — daily gratitude (per family member) with a rotating prompt and a Gratitude Garden streak.
- `Added` **Prayer Leader rotation** — shows whose turn it is to lead prayer, with a "Pass to next" control (faith-gated).
- `Added` **Family Storybook** — auto-builds a chapter per completed adventure (stamp, subjects, reflections) + a Gratitude Memories page, with **Print / Save-as-PDF**.
- `Changed` Seeded the real family roster: **Shaun, Taylor, Grandma, Rylee, Ezra, Asa, Selah.**
- `Improved` Safe one-time migration upgrades older saved profiles (the "Kiddo" placeholder) to the full roster **without losing progress**.
- `Accessibility` Print styles hide navigation/controls for a clean printed keepsake.

---

## [0.3.0] — 2026-07-08 · Classroom & Deployment Readiness

**Summary:** Made the app classroom-ready and prepared it for hosting.

- `Added` **Fullscreen "Present" mode** for teaching on a TV/projector.
- `Deployment` Added static `vercel.json` for the app (no-build, security headers).
- `Documentation` Added `DEPLOYMENT.md`, `README.md`, and `CONTRIBUTING.md`.

---

## [0.2.0] — 2026-07-08 · World 1 Expanded

**Summary:** Grew the first world to a full ten-adventure journey.

- `Added` 5 new adventures: **Volcanoes · Amazing Animals · Rice Terraces · Marine Life · Filipino Heroes & History** (10 total).
- `Added` 6 new badges (16 total), including a 7-adventure streak and Philippines Champion.
- `Changed` Tuned the top level so completing World 1 reaches **Wonder Master**.
- `Improved` Deterministic seed data keeps content stable across reloads.

---

## [0.1.0] — 2026-07-08 · World 1 MVP (Project Foundation)

**Summary:** First working release — a gamified family learning adventure through the
Philippines, built as a dependency-free static app.

- `Added` **Adventure Classroom** with 5 multi-subject adventures (Geography, English, Math, Tagalog, Hiligaynon, Science, Cooking, Arts, Music, optional Bible, Family Discussion, Character).
- `Added` **Quiz engine** (auto-scored) + **Reflection Journal**.
- `Added` Gamification: **XP, levels, 10 badges, Travel Passport, Adventure Tree.**
- `Added` **Family Cookbook** and configurable **Family** roster.
- `Added` **Faith toggle** (hides all Bible/Christian content for reuse) and light/dark themes.
- `Added` `localStorage` persistence + JSON **backup/restore**.
- `Documentation` Established the curriculum framework and project README.
- `Architecture` Isolated content (`curriculum.js`) from logic (`app.js`) and design (`index.html`); data layer built to migrate to Supabase later — **white-label ready.**

---

## Deployment History

| Date | Event |
|------|-------|
| 2026-07-08 | Wonder Journey OS committed to GitHub (`sharonrosealgara-ui/shawie`, `wonder-journey/`). |
| 2026-07-08 | Live preview published (Claude artifact) and kept in sync with each release. |
| _pending_ | Vercel production deploy + custom domain (see `DEPLOYMENT.md`). |

---

## Appendix — Templates

### Release template
```
## [x.y.z] — YYYY-MM-DD · Title
Summary: one-line description.
Added / Changed / Improved / Fixed / Removed:
Known Issues:
Migration Notes:
Future Plans:
```

### Bug-fix template
```
### Fix: <short title>  (vx.y.z)
Issue: what went wrong
Cause: root cause
Solution: what changed
Files Changed: …
Verification: how it was confirmed fixed
```

---

## Versioning Strategy

- **PATCH** (`x.y.Z`) — bug fixes, copy tweaks, small content edits.
- **MINOR** (`x.Y.0`) — new features or new adventures, backward-compatible.
- **MAJOR** (`X.0.0`) — production release / breaking changes (e.g. moving to Supabase accounts). **`v1.0.0` = first production release** on a custom domain with automation and PWA.

> **Every meaningful change gets an entry.** Wonder Journey OS keeps a complete history
> from the first MVP to future commercial releases.

---
*A Digital Solutions Studio project · Built with ❤️ for the Ferrell Family.*
