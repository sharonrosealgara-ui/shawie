# 📓 Wonder Journey OS — Changelog Policy & Development Log

- **Version:** 1.0 · **Status:** Active · **Maintained by:** Claude Code

> The official development history & changelog policy. **Live, per-version entries
> are kept in [`../CHANGELOG.md`](../CHANGELOG.md)** (Keep a Changelog + SemVer);
> this document defines the rules and holds the session development log and release
> history. Never end a session without recording changes in both.

---

## Versioning policy (SemVer — MAJOR.MINOR.PATCH)
- **MAJOR** — breaking architecture, large redesigns, DB restructuring, platform-wide UI overhaul, major curriculum revisions.
- **MINOR** — new features/modules/adventures/dashboards/themes/APIs/animations.
- **PATCH** — bug fixes, performance, accessibility, grammar/UI polish, docs, small curriculum corrections.

## Change types
`Added` · `Changed` · `Improved` · `Fixed` · `Removed` · `Security` · `Performance` · `Documentation`.

## Release format
Each release in `../CHANGELOG.md` uses: version + date + status, then the change
types above, then optional **Notes** (release notes · known limitations · migration).

---

## Development log

### Session 001 — Foundation *(through v0.13.0)*
- **Developer:** Claude Code
- **Summary:** Built Wonder Journey OS World 1 (Philippines): the cinematic Adventure
  Theater, Presentation Design / Theme / Scene engines, the interactive map + real
  Philippines vector, 72-adventure curriculum framework (a1–a10 fully authored),
  Real Educational Media System (policy + manifest + resilient component + asset
  library), age framework + per-child Personalization Engine, Passport, Badges,
  Adventure Tree, Family Storybook, Cookbook, Morning Blessings, and the
  Celebrations page (birthdays · milestones · memory timeline). Established the
  Constitution and core documentation.
- **Known issues:** real media asset files pending; content authored a1–a10 only.
- **Next milestone:** Teacher Portal.

### Session 002 — Grown-up Tools, Celebrations & Docs *(v0.14.0 → v0.15.0, 2026-07-09)*
- **Developer:** Claude Code (Autonomous Build Mode)
- **Summary:** Documentation foundation (`docs/` numbered source-of-truth set +
  Build Status dashboard + this changelog policy); **Teacher Portal** (lesson plans,
  materials/ingredients, copy-ready summaries for all 72 adventures); **Parent
  Dashboard** (progress ring, upcoming prep, after-class summary); **printable
  Certificates**; **milestone celebration pop-ups**. Wired `curriculum-map.js` into
  the app; added `toast()`, materials layer, milestones.
- **New components:** Lesson Card, Progress Ring, Prep Chips, Certificate, Milestone Modal, Toast.
- **Bugs fixed:** Birthday section always-visible; dashboard level reference.
- **Tests:** syntax + full Playwright regression (13 views + adventure) — no errors.
- **Next milestone:** Curriculum authoring (Phase 9), Unit 3 onward.

### Session 003 — *(in progress)*
- Curriculum authoring, Unit 3 (Family, Values & Community). See `../CHANGELOG.md`.

---

## Release history
| Version | Summary |
|---|---|
| 0.9.x | Cinematic theater, warm tropical theater, real map |
| 0.10.x | Presentation Design Engine, Real Media System |
| 0.11.x | Constitution, full media manifest |
| 0.12.x | Personalization Engine, birthdays visible |
| 0.13.0 | Celebrations page |
| 0.14.0 | Teacher Portal + Parent Dashboard |
| 0.15.0 | Certificates + milestone celebrations |
| → 1.0.0 | Target: full curriculum + real assets + deployment |

---

## Tracked change categories
When these change, record specifics in `../CHANGELOG.md` and here as needed:
- **Curriculum** — affected adventure · lesson · reason · objective · parent request · personalization.
- **Media** — new images/audio/maps/illustrations · replacements · licensing · optimization.
- **Dependencies / Database / API** — package+version+reason+impact · schema migrations · endpoint changes *(SaaS phase).*
- **Deployment** — host, domain, SSL, env vars, CI/CD.

## Known issues (live)
- Real photo/map asset files not yet uploaded — resilient placeholders shown.
- Interactive content authored a1–a10; a11–a72 on schedule/metadata + Teacher Portal plans.
- Single mascot vs. six-mascot cast (Design Bible) — migration pending.

## Future improvements (approved, not yet implemented)
AI voice narration · offline/PWA mode · interactive globe · 3D museum · AR
experiences · multiple families · achievement sharing · printable activity packs ·
voice pronunciation practice · family calendar sync.

---

> The changelog is the permanent historical record of Wonder Journey — it should
> tell the complete story of how it evolved from an idea into a production-ready
> family learning platform. Every meaningful change deserves to be documented.
