# 🗂️ Wonder Journey OS — Knowledge & Media Library

- **Version:** 1.0 · **Status:** Production architecture (MVP core live) ·
  **Priority:** Critical · Governed by the [Constitution](../CONSTITUTION.md) &
  [Real Media Policy](../REAL_MEDIA_POLICY.md)

> One centralized library is the **single source of truth for every lesson's
> media**. Lessons never hardcode image paths — they reference library ids
> (`MEDIA[id]` via `mediaFigure()` / `ADVENTURE_MEDIA` / recipe `media` keys).
> Children explore the REAL world through REAL media; AI illustration is permitted
> only for mascots, storybook/fantasy scenes, decorative UI, and celebration
> graphics — never for factual content.

---

## Architecture (✅ live — MVP single source of truth)
- **Registry:** `media-manifest.js` — every asset has id · title/subject ·
  category/kind · `real` flag · file path (assets/ tree = storage location) · alt ·
  caption · **creator credit · license · source URL · status** · sourceType ·
  fallback · teacherGuidance. `mk()` normalizes entries; fields extend without
  migration (SaaS DB will mirror this schema and add: language, age/grade,
  dimensions, duration, transcript, version, approval status, cloud path…).
- **Retrieval:** `mediaFigure(id)` is the ONLY renderer — lazy-loads the local
  file, shows alt/caption/credit/badge, and **never breaks a lesson**: missing
  media = warm placeholder + "not yet added" + Teacher-Mode guidance. No broken
  images, no hotlinks, ever.
- **Categories (✅):** map · symbol · volcano · landmark · terrace · beach ·
  animal · ocean · food · festival · background · bible-map · bible-place — the
  taxonomy grows freely (history, science, music, transportation, weather…).
- **Licensing system (✅):** per-asset license + credit + source recorded; visible
  attribution rendered to learners; commercial-safe licenses only (PD · CC0 ·
  CC BY · CC BY-SA); `CREDITS.md` attribution report; sourcing tool
  (`tools/source-media.mjs`) legally fetches from open repositories — **no
  scraping of copyrighted content.**
- **Search (✅ new):** Teacher Portal **Media Library manager** — instant search
  across title/tags/category, filters by category & status, live preview via
  `mediaFigure`, per-asset license/credit/guidance.
- **Performance (✅ MVP):** lazy loading; only the current lesson's ids render;
  1200px optimized copies; no external requests.
- **Integration (✅):** Adventure Theater galleries · Cooking Academy · Teacher
  Portal · maps (`phPostcard` real-map component) · quizzes/storybook/cookbook via
  the same ids.

## SaaS-phase roadmap 🔜 (documented, not yet built)
Upload workflow (teacher/client uploads with guided metadata: title, category,
alt, license, credits, tags) · validation/virus scanning/permissions · cloud
storage + CDN + responsive/modern formats + streaming video · **Video Library**
(captions, transcripts, speed, bookmarks, ducking via Sound Director) ·
**Interactive map system** (Leaflet/MapLibre/OSM tiles, zoom/pan/markers/routes) ·
client media replacement without code (branding, recipes, worksheets,
certificates) · unlimited scale, AI-assisted/semantic search, OCR, image
recognition, video indexing · approval workflow & versioning.

## Rules that never change
1. Factual content → authentic media (real photo/map/video) whenever possible.
2. Every asset carries license + credit; attribution preserved and displayed.
3. Missing media degrades gracefully — the lesson always continues.
4. Lessons reference library ids only — never hardcoded file paths.
5. Accessibility: alt text required; captions/transcripts for future video.
