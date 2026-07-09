# 🏗️ Wonder Journey OS — Architecture

- **Version:** 1.0 · **Status:** Active

> How the app is built today, and where it is heading. Governed by the
> [Constitution](../CONSTITUTION.md).

---

## 1. Current architecture (MVP)

Wonder Journey OS ships today as a **dependency-free, single-page static web app** —
no build step, no framework, no server. This keeps it fast, offline-capable,
portable (any static host or a Claude Artifact), and easy for one family to run.

```
wonder-journey/
├── index.html          # App shell: <head> (fonts) + all CSS + view containers + <script> tags
├── curriculum.js       # Content data: ADVENTURES (full interactive), BADGES, COOKBOOK, LEVEL_* 
├── curriculum-map.js   # CURRICULUM_MAP — 72-adventure schedule + metadata (World→Unit→Adventure)
├── media-manifest.js   # MEDIA registry (66 assets) + ADVENTURE_MEDIA mapping
├── app.js              # All logic: state, views, router, Adventure Theater, engines, components
├── assets/             # Local licensed media (philippines/, animals/, food/, festivals/, bible/, …)
└── docs/ + *.md        # Source-of-truth documentation
```

### Data flow
- **State** — a single `S` object (see `DEFAULT_STATE`) persisted to `localStorage`
  under one key. `loadState()` performs safe, versioned upgrades/backfills.
- **Rendering** — plain template strings injected into a `#root` container. A tiny
  router (`go(view)` + `VIEWS` map) swaps full views. No virtual DOM.
- **Content** — `curriculum.js` holds authored interactive adventures;
  `curriculum-map.js` holds the full 72-lesson schedule + metadata that powers the
  map, Teacher Portal, and Parent Dashboard even before prose is authored.

### Key subsystems (all in `app.js`)
- **Adventure Theater** — `openCinema()` → `buildScenes()` → `renderScene()` /
  `renderCine()`. Fullscreen cinematic player; scene types: intro · map · gallery ·
  learn · missions · yourway · quiz · reflect · ending.
- **Presentation Design Engine** — one identity, per-adventure environment:
  `THEMES` + `themeFor()` + `decorHTML()`.
- **Theme Engine** — `themeFor(a)` picks a theme via explicit `THEME_BY_ID` then
  keyword inference; drives sky, decor, ground, accent.
- **Scene Engine** — reusable scene renderers keyed by `sc.type`.
- **Real Media System** — `MEDIA` manifest + resilient `mediaFigure()` (local/cloud
  only, graceful placeholder, alt/caption/credit, teacher guidance).
- **Personalization Engine** — `CHILD_PROFILES` + `PERSONALIZE` + `personalActivities()`.
- **Teacher Portal / Parent Dashboard** — read the curriculum map + a `MATERIALS`
  layer to produce lesson plans, prep lists, and summaries.
- **Rewards** — `awardCompletion()`, `awardBadge()`, `checkAutoBadges()`, XP/levels.

---

## 2. Design principles
- **Configuration-first** — family, faith content, birthdays, teacher mode are all
  configurable (Constitution: holiday content must be configurable).
- **Resilient by default** — a missing asset never breaks a lesson.
- **Additive data** — new adventures/media are data, not code changes.
- **Separation of views** — Family View stays clean; Teacher tools are opt-in.

---

## 3. Target architecture (SaaS phase — planned)
For multi-family, commercial use:
- **Framework:** Next.js + TypeScript + React (see [CONTRIBUTING](../CONTRIBUTING.md)).
- **Backend:** Supabase (auth, per-family data isolation, cross-device sync).
- **Media:** licensed assets in a CDN bucket; same manifest contract.
- **Automation:** Make.com (weekly parent summaries, email, calendar, Drive backup).
- **Delivery:** PWA (installable, offline), white-label, multi-language.

The current static app is the reference implementation; the SaaS migration reuses
the same content contracts (`CURRICULUM_MAP`, `MEDIA`, adventure schema).

---

## 4. Testing
- **Syntax:** `node -e "require('vm').compileFunction(fs.readFileSync('app.js'),[],{})"`.
- **Behavior + visuals:** Playwright (headless Chromium) drives the combined app,
  asserts scene/view state, and captures screenshots.
- **Manual matrix:** Family View · Teacher Portal · Adventure Theater · navigation ·
  responsiveness · accessibility.
