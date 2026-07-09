# 🧭 Wonder Journey OS — Decision Records (ADRs)

- **Version:** 1.0 · **Status:** Active

> Significant architecture & product decisions, newest first. Governed by the
> [Constitution](../CONSTITUTION.md).

---

### ADR-010 — Reconcile the sampler adventures with the 72-lesson map *(PROPOSED — needs owner decision)*
**Problem:** The 10 fully-authored *playable* adventures (`curriculum.js`) are a
one-per-unit sampler numbered `a1–a10` sequentially (Welcome, Islands, Champorado,
Bayanihan, Fiesta, Volcanoes, Animals, Rice Terraces, Ocean, Heroes). The canonical
**72-lesson map** (`curriculum-map.js`) assigns those same topics to *different* ids
(Champorado=`a7`, Bayanihan=`a13`, Fiesta=`a19`, Volcanoes=`a25`, Animals=`a31`,
Rice Terraces=`a37`, Ocean=`a43`, Heroes=`a49`). Result: the Teacher Portal
(map-driven) and the Adventure Theater (sampler-driven) disagree on what `a3`–`a10`
are, and `THEME_BY_ID` / legacy `ADVENTURE_MEDIA` in `app.js` are keyed to sampler
ids while the new media manifest is keyed to map ids.
**Options:**
- **(A) Re-slot the sampler onto true map ids** — renumber authored a3→a7, a4→a13,
  a5→a19, a6→a25, a7→a31, a8→a37, a9→a43, a10→a49 (a1/a2 unchanged); update
  `THEME_BY_ID`, `LEVEL_MISSIONS`, legacy media keys, and the map's `built` flags.
  Then author the remaining slots unit by unit. *Single canonical curriculum.*
  **(Recommended.)**
- **(B) Keep the sampler as "Volume 0"** and treat the 72-map as a separate future
  track. *Fastest, but leaves two parallel curricula and a confusing Teacher Portal.*
- **(C) Re-theme the sampler in place** to match map a1–a10 exactly (a3=Flag,
  a4=Greetings, …) and move the current sampler content to their real slots later.
**Status:** Awaiting owner decision before large curriculum authoring proceeds.

### ADR-009 — Teacher Portal & Parent Dashboard read the curriculum map
**Decision:** Grown-up planning tools generate lesson plans, materials and
summaries from `CURRICULUM_MAP` metadata + a `MATERIALS` layer, so all 72
adventures are usable for planning even before their prose is authored.
**Why:** Delivers the Constitution's "Parent Experience" immediately without
blocking on full content authoring.

### ADR-008 — Personalization from theme, not per-lesson authoring
**Decision:** Per-child activities are chosen from the adventure's theme via a
`PERSONALIZE` library (+ topic-aware default), not hand-written per lesson.
**Why:** Automatic coverage of all 72 adventures; consistent quality; zero
per-lesson cost. Trade-off: less bespoke than hand-authoring (acceptable).

### ADR-007 — Constitution is the highest authority
**Decision:** `CONSTITUTION.md` supersedes all other docs and code.
**Why:** Protects the vision across many incremental changes.

### ADR-006 — Real media, never AI fakes; resilient placeholders
**Decision:** Real places/maps/animals/food/festivals use authentic licensed
media only; missing files render honest placeholders via `mediaFigure()`.
**Why:** Educational truthfulness + commercial safety ([05_REAL_MEDIA_POLICY](../REAL_MEDIA_POLICY.md)).

### ADR-005 — Feast-Day-respectful, configurable holidays
**Decision:** No assumed Christmas/Easter; December unit is "fully configurable"
and the seven biblical Feasts are the reference frame.
**Why:** Respects the family's faith practice (Constitution).

### ADR-004 — One combined artifact for live preview
**Decision:** For the hosted Claude Artifact, the 4 source files are inlined into
one HTML document (fonts/images degrade gracefully under CSP).
**Why:** Single shareable URL for instant family preview; source stays modular.

### ADR-003 — localStorage single-object state
**Decision:** All state in one `S` object with versioned `loadState()` upgrades.
**Why:** Simple, offline, no backend for the MVP; clean migration path to Supabase.

### ADR-002 — Dependency-free vanilla-JS static app for MVP
**Decision:** No framework/build step; plain HTML/CSS/JS.
**Why:** Fast, portable, offline, zero-maintenance for one family. Next.js/React is
the documented target for the multi-family SaaS phase.

### ADR-001 — World → Unit → Adventure content model
**Decision:** Curriculum is modeled as Worlds containing Units containing
Adventures, with a schedule + subject metadata per adventure.
**Why:** Scales to future worlds/countries; separates schedule from authored prose.

---

## Open decisions (to resolve)
- **Mascot cast:** Design Bible defines six mascots (Tala, Lila, Kiko, Isla, Agila,
  Coco); the build currently ships one guide ("Sinag"). *Pending: migrate to the
  six-mascot cast, mapping each to relevant scene types/themes.*
- **Backend timing:** when to introduce Supabase (multi-family) vs. staying static.
