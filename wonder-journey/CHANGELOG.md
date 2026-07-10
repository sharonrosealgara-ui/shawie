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

## [0.23.1] — 2026-07-14 · 📷 Real-media licensing pipeline

- `Added` **`tools/source-media.mjs`** — the one-command licensed-photo pipeline: searches Wikimedia Commons with 71 curated terms, accepts **only commercial-safe licenses** (Public Domain · CC0 · CC BY · CC BY-SA — NC/ND/unknown rejected), downloads 1200px copies to the exact `assets/…` paths (never hotlinks), auto-fills `credit` + `license` + `source` + `status:"ready"` in the manifest, and writes an attribution table to `CREDITS.md`. Supports `--dry-run`, `--only`, `--redo`.
- `Fixed` `mk()` in `media-manifest.js` now honors `credit`/`license`/`source`/`status` overrides (previously hardcoded), so sourced attribution actually flows to `mediaFigure()` — which displays the photo **with visible credit** the moment a file lands.
- `Documentation` `docs/18_MEDIA_SOURCING.md` — runbook + human-review checklist + own-photos guidance + video policy. Note: this cloud sandbox's network policy blocks image sites, so the tool runs on the owner's machine (or a session with web access); everything else is automated.

---

## [0.23.0] — 2026-07-14 · 🔊 Immersive Cinematic Sound System (core)

- `Added` **Sound Director** — one centralized audio engine (`SND`): master + channel gains (ambient · effects; music/voice reserved), crossfades, persistence, and teardown. No component plays audio independently; all legacy sound effects now route through it. **Fully synthesized Web Audio** — CSP-safe, zero files, nothing to license.
- `Added` **Adaptive Sound Engine** — every adventure automatically gets a gentle themed environment that crossfades in/out with the Adventure Theater: ocean waves + gulls (islands/geography), wind + faint rumble (volcano), stream + birds (terraces/village), forest calls (wildlife), kitchen bubbling (cooking), soft distant drums (festival), a peaceful pad + breeze (Bible lands), calm breeze (history). Obeys the theater mute button; never cuts abruptly.
- `Added` **🔊 Sound Studio** in Settings — mute-all, **Reduced Sound Mode** (brief cues only, no ambience), Master/Ambient/Effects sliders, preview chime; preferences saved.
- `Added` Signature **memory-saved chime** on Cookbook keepsake saves; gentle (never harsh) quiz feedback retained.
- `Accessibility` Wonder Journey remains fully usable with sound off; reduced-sound honors sensitive listeners.
- `Documentation` `docs/17_SOUND_SYSTEM.md` — live features + roadmap (music library, narration engine, mascot voices, Family Voice Memories).

---

## [0.22.0] — 2026-07-14 · Unit 4 complete + two-portal architecture (ADR-011)

- `Added` **Unit 4 fully authored** — five new interactive adventures (a20–a24), Festival theme with aligned real-media:
  - **a20 · Sinulog & Ati-Atihan: Dance & Drums** (Enthusiasm) — the two great January festivals, rhythm patterns & counting beats, Miriam's song.
  - **a21 · Panagbenga: The Flower Festival** (Appreciation) — Baguio in bloom, symmetry in flowers, descriptive writing, consider the lilies.
  - **a22 · Filipino Music & Instruments** (Creativity) — kulintang, rondalla & bamboo, rhythm as fractions, Psalm 150.
  - **a23 · Make & Move: Festival Crafts & Dance** (Expression) — masks & banderitas, shapes & measuring, the Sinulog step, parable of the talents.
  - **a24 · Our Family Celebration Project** (Togetherness) — plan a real celebration, schedule/time math, speaking & presenting, joyful gatherings.
  - Each with 8–9 sections, a 4-question quiz, reflection, and 3-tier missions. **Units 1–4 complete (a1–a24) — 29 of 72 adventures interactive.**
- `Changed` **Two-portal architecture (ADR-011)** — exactly two portals: **👩‍🏫 Teacher Portal** (Lesson Plans + Client Summary + Teacher Mode; admin tools roadmap) and the **Client/Student Portal** (everything learner-facing), which serves families, students, tutoring and learning-center clients alike. "Parent Dashboard" is now **Client Summary** under the Teacher Portal group.
- `Added` **`WJ_CONFIG`** — client name/branding now lives in configuration (title, sidebar footer, storybook line), never in architecture; the Ferrell family is seed data. Ready for future multi-client sale.

---

## [0.21.0] — 2026-07-09 · 🍳 Cooking Academy (core)

- `Added` **Wonder Journey Cooking Academy** — a new sidebar module where each recipe is a full studio lesson, not a recipe card. `recipes.js` holds a modular `RECIPES` data model (extensible to more dishes and future world cuisines with no code changes) + 9 cooking badges.
- `Added` **Studio recipe lesson** (`openRecipe`) — wooden studio board, movie-style story + history + fun fact, **real Philippines map** geography, **language table (English · Tagalog · Hiligaynon)**, ingredients + real-media placeholders, kitchen tools & **safety card**, numbered cooking steps, **math · science · nutrition** cards, **per-child activities**, a **family challenge**, and a playful **kitchen quiz** with instant feedback.
- `Added` **Completion pipeline** (`finishRecipe`) — a rating/favorite/gratitude/participants modal → confetti celebration, cooking **badge** + **XP**, and an **auto-generated Family Cookbook keepsake page**.
- `Changed` **Family Cookbook** rebuilt as a **keepsake album** — each cooked recipe becomes a taped scrapbook page (photo, date, who cooked, rating, favorite part, gratitude, badge, stamp, XP), plus a recipe library.
- `Added` 5 recipes (Mango Graham Float · Banana Cue · Puto · Chicken Adobo · Halo-Halo); dish media placeholders in the manifest; `docs/16_COOKING_ACADEMY.md`.
- `Docs` Roadmap for the module: more recipes, Cooking Theater scene-mode + themed kitchens/mascots, Little Chef Passport, Grandma's Recipe Box, Family Heritage Wall, photo upload.

---

## [0.20.0] — 2026-07-09 · Unit 3 complete (Family, Values & Community)

- `Added` **Unit 3 fully authored** — five new interactive adventures (a14–a18), Village & Values theme:
  - **a14 · Respect for Elders: Po, Opo & Mano** (Respect) — the mano blessing, polite words, elder & kinship terms, age math, honor your father & mother.
  - **a15 · Filipino Hospitality: Welcoming Guests** (Hospitality) — "Tuloy po kayo!", table-setting arrays, welcoming phrases, Abraham's three visitors.
  - **a16 · Our Family Tree & Kinship Words** (Family) — roots-and-branches, Filipino family vocabulary, generations & diagrams, Ruth's loyalty.
  - **a17 · Kindness in Our Community** (Kindness) — the barangay, tally & graph kind acts, love your neighbor.
  - **a18 · Family Act-of-Service Project** (Service) — choose & plan a real project, supply math, Jesus washing feet, reflection writing.
  - Each with 8 sections, a 4-question quiz, reflection, and 3-tier missions. **Units 1–3 complete (a1–a18) — 24 of 72 adventures interactive.**

---

## [0.19.0] — 2026-07-09 · Unit 2 complete (Filipino Food & Kitchen)

- `Added` **Unit 2 fully authored** — five new interactive adventures (a8–a12), all in the Cooking Studio theme with aligned real-media:
  - **a8 · Rice: The Heart of Every Meal** (Gratitude) — field-to-bowl, the 1:2 rice-to-water ratio, reading a recipe, Joseph storing grain.
  - **a9 · Market Day: Shopping & Money Math** (Stewardship) — the palengke, peso money & making change, shopping lists, honest scales (Proverbs), need vs. want.
  - **a10 · Fruits of the Philippines** (Sharing) — mango/banana/buko, division by sharing equally, taste adjectives, the Fruit of the Spirit.
  - **a11 · Merienda Time** (Joy) — Filipino snacks, doubling a recipe (×2), sharing generously (Acts 2).
  - **a12 · Our Family Cookbook Begins** (Creativity) — parts of a recipe, measurement review, writing clear steps, "give us our daily bread."
  - Each with 8 sections, a 4-question game quiz, reflection, and 3-tier level missions. **Units 1 & 2 complete — 19 of 72 adventures interactive.**

---

## [0.18.0] — 2026-07-09 · Unit 1 complete + owner's birthday

- `Added` **Unit 1 fully authored** — three new interactive adventures completing "Welcome to the Philippines":
  - **a4 · First Words: Tagalog & Hiligaynon Greetings** (Friendliness) — greetings in both languages, counting 1–10 in Filipino, Tower of Babel, speaking/listening role-play. Village theme + mano-po media.
  - **a5 · Reading a Map: World → Asia → Philippines** (Wonder) — zoom levels, compass rose, map keys, grid coordinates, Abraham's journey. Geography theme + world/PH map media.
  - **a6 · Our Wonder Journey Passport & Backpack** (Readiness) — passport stamps, the "invisible backpack" (curiosity/kindness/courage/gratitude), sorting & checklists, the wise builder. Island theme.
  - Each with 8–10 sections, a 4-question game quiz, reflection, and 3-tier level missions. **14 of 72 adventures now interactive.**
- `Added` Owner **Sharon (Teacher)** added to the default family roster with birthday **July 21** so Celebrations includes her.

---

## [0.17.0] — 2026-07-09 · New adventure a3 + Animation System doc

- `Added` **Adventure a3 — "The Filipino Flag & National Symbols"** (Unit 1, Fri Jul 10), fully authored per the Content Style Guide: story hook, flag colors & 8-ray sun, national symbols (sampaguita · narra · eagle · carabao), math (counting/grouping with 8), Tagalog & Hiligaynon in context, a Bible connection (God's promise / the rainbow, Genesis 9), English adjectives, family discussion, the value of **Respect**, a 4-question game quiz, reflection, and 3-tier level missions. Uses the Theme & Scene engines and the aligned flag/sampaguita/narra real-media gallery. Now **11 of 72 adventures fully interactive.**
- `Documentation` `docs/15_ANIMATION_SYSTEM.md` — motion language, timing tiers, transitions, per-feature motion, reduced-motion & performance rules.

---

## [0.16.0] — 2026-07-09 · Curriculum id alignment (single canonical schedule)

- `Changed` **Re-slotted the 10 fully-authored adventures onto their canonical 72-map ids** (ADR-010, Option A): Champorado a3→**a7**, Bayanihan a4→**a13**, Fiesta a5→**a19**, Volcanoes a6→**a25**, Animals a7→**a31**, Rice Terraces a8→**a37**, Ocean a9→**a43**, Heroes a10→**a49** (a1/a2 unchanged). The Adventure Theater and Teacher Portal now agree, and the theme engine, level missions, and **real-media manifest all align with what actually plays** (e.g., a7 Champorado shows champorado media).
- `Changed` `curriculum-map.js` `built` flags now mark exactly the 10 interactive slots; the other 62 correctly read as "plan ready" in the Teacher Portal.
- `Improved` `THEME_BY_ID` updated to the map ids.
- `Fixed` One-time `loadState()` migration (`reslotV2`) remaps any saved progress (completed · stamps · reflections) from old sequential ids to the new map ids, so returning families keep their stamps and scores.
- `Documentation` ADR-010 recorded; this alignment unblocks unit-by-unit authoring of the remaining slots.

---

## [0.15.0] — 2026-07-09 · Certificates + milestone celebrations

- `Added` **Printable certificates** — an elegant, print/PDF-ready certificate (double-gold border, globe seal, family explorers' names, achievement, live stats, dated signature). Two kinds: **Adventure Journey** (always available) and **World 1 Champions** (unlocks at all 72). Available from the Celebrations page; dedicated print stylesheet renders just the certificate in landscape.
- `Added` **Milestone celebration pop-ups** — confetti + a warm modal when the family crosses 1 · 3 · 7 · 12 · 24 · 36 · 72 adventures, each shown once (tracked in `milestonesShown`), with a shortcut to claim the matching certificate. Fires on return-to-view after completions.
- `Added` `MILESTONES`, `pendingMilestone()`, `checkMilestones()`, `openCertificate()`, `familyExplorers()`.

---

## [0.14.0] — 2026-07-09 · Teacher Portal + Parent Dashboard (grown-up tools)

- `Added` **👩‍🏫 Teacher Portal** — a plannable view of **all 72 adventures**, grouped by unit with a "coming up next" section. Each lesson is an expandable plan generated from the curriculum map: objective; woven subjects (Language · Math · Science & Culture · Bible · Value); **materials & ingredient lists** (theme-based + specific kits like champorado ingredients, build-a-volcano, plant-a-seed, parol craft); personalized per-child activities; a **📋 Copy lesson plan** button; and an *Open Adventure* shortcut for fully interactive lessons.
- `Added` **📊 Parent Dashboard** — a calm at-a-glance view: progress ring + stats (adventures, XP, badges, stamps, level), an **upcoming-lessons preview** with a de-duplicated **"prepare these for the week"** materials list, and a **copy-ready after-class summary** (what we learned, value, quiz scores) to share or save.
- `Added` `curriculum-map.js` is now loaded by the app, powering both grown-up tools; `MATERIALS_BY_THEME`, `THEME_FOCUS`, `LESSON_MATERIALS`, `teacherPlan()`, `lessonSummaryText()`, `afterClassSummary()`, and a lightweight `toast()`.
- `Added` A **"For Grown-ups"** sidebar group (Parent Dashboard · Teacher Portal). In-adventure teacher extras remain gated behind Teacher Mode; Family View stays clean.

---

## [0.13.0] — 2026-07-09 · Celebrations page (birthdays · milestones · memory timeline)

- `Added` **Dedicated "🎉 Celebrations" page** in the sidebar — a single home for everything the family celebrates (Constitution §Celebrations):
  - **🎂 Birthdays** — upcoming birthdays with days-to-go, plus *Add / Manage* and *Preview a Celebration* actions.
  - **🏆 Milestones & Achievements** — live stats (adventures, XP, stamps, badges), a lit-up **milestone ladder** (1 → 3 → 7 → 12 → all of World 1) with a "next milestone" nudge, and an **earned-badge strip**.
  - **📖 Memory Timeline** — an automatic, date-sorted history that weaves together completed adventures (with quiz scores), morning blessings (gratitude + prayer), and birthdays celebrated — the family's growing story in one place.
- `Added` `memoryTimeline()` builds the timeline from existing saved data (completions carry dates; blessings & birthdays are keyed by date) — no new tracking needed.

---

## [0.12.1] — 2026-07-09 · Celebrations & Birthdays always visible

- `Fixed` The **Birthday Celebration section** was hidden whenever no birthdays were set (and none are set by default), so it couldn't be found. Home Base now **always shows a "🎂 Celebrations & Birthdays" section**: when birthdays exist it lists the next ones with a *Manage birthdays* link; when none are set it shows a warm empty state with **🎂 Add Birthdays** (jumps to Settings) and **✨ Preview a Celebration** (shows the confetti birthday surprise right away).
- `Added` `previewBirthday()` — lets the family see the birthday celebration before any date is entered.
- `Improved` Settings now clearly labels the birthday field (*"Family Members & 🎂 Birthdays"*) with guidance that setting a birthday triggers a confetti celebration on the day.

---

## [0.12.0] — 2026-07-09 · Personalization Engine (one adventure, four ways)

- `Added` **Personalization Engine** — a permanent, automatic feature (Constitution §Personalization Engine). Every adventure now includes an **"Explore It Your Way"** scene with an optional activity tuned to each child: **🎨 Rylee** (artist & animal-lover), **🔨 Ezra** (builder & historian), **⚙️ Asa** (engineer & explorer), **🏘️ Selah** (artist & mini-world maker). Everyone learns the same topic — each experiences it their own way.
- `Added` **Theme-aware activity library** — activities are chosen from the adventure's auto-selected theme (volcano, ocean, cooking, festival, wildlife, terraces, history, village, Bible lands, geography, island), so all **72 adventures** get on-topic, interest-matched activities with no per-lesson authoring. New/unknown themes fall back to a topic-aware default per child. *(Example — Volcanoes: Rylee draws volcano wildlife · Ezra builds a volcano model · Asa engineers a baking-soda eruption · Selah makes a mini volcano village.)*
- `Added` Warm color-coded child cards (`.kids-grid` / `.kid-card`) in the cinematic player, each with the child's icon, interest tag and activity.

---

## [0.11.1] — 2026-07-09 · The Wonder Journey Constitution

- `Added` **`CONSTITUTION.md` (v1.0)** — the project's **highest-authority** document (Owner: Sharon Rose Algara). It codifies the Promise, Mission, Vision & Core Philosophy; **9 Product Principles**; who it's built for (the family by name); the parents' priority order (Filipino language → culture → values → cooking → geography → academics); the Christian foundation — **Feast-Day-respectful** with the seven biblical Feasts named (Passover, Unleavened Bread, Firstfruits, Pentecost, Trumpets, Atonement, Tabernacles) and all holiday content **configurable**; per-child personalization; Experience Standards; and the Quality Standard's *Final Question* → *"We are not building software. We are building a childhood."* **When any decision conflicts with the Constitution, the Constitution wins.**
- `Documentation` `README.md` and `CONTRIBUTING.md` now point to the Constitution as the top authority.

---

## [0.11.0] — 2026-07-09 · Real Educational Media System (production-ready)

- `Added` **`REAL_MEDIA_POLICY.md`** — the production standard for every image, map & illustration: the one rule (real things → real, licensed media, **never AI-generated**), what must be a real photo/map vs. when illustrations are allowed, full licensing/attribution rules, real **Bible-geography** rules (Sea of Galilee, Mt. Sinai, Jerusalem, Nineveh…), no-hotlinking, and the placeholder promise.
- `Added` **Full media manifest for all 72 adventures (Jul–Dec 2026)** — regenerated `media-manifest.js` with **66 curated media entries** and a per-adventure `ADVENTURE_MEDIA` map (70 of 72 adventures carry media). Every entry has: title, category, `real` flag, local `file` path (mapped to the asset library), `alt`, `caption`, `credit`/`license` (to fill), `sourceType`, **`fallback`** placeholder, **`teacherGuidance`**, and `status`.
- `Added` **Asset Library** — `assets/` folder tree: `philippines/{maps,landmarks,volcanoes,beaches,rice-terraces}`, `animals`, `food`, `festivals`, `bible/{maps,locations}`, `backgrounds`, `mascots`, `stickers`, `icons`, each tracked with `.gitkeep`, plus `assets/README.md`.
- `Improved` **Resilient `mediaFigure()`** — now reads the manifest's `fallback` (emoji + label) and `teacherGuidance`; shows a **real-photo / illustration badge**, a "real, licensed photo/map coming" note until credited, and the exact file/source/license instruction in Teacher Mode. Loads local/licensed files only — never hotlinks; a missing photo never breaks a class.
- `Added` **"Real Photos" gallery scene** — every adventure with manifest media now shows an authentic-media gallery (after Travel Mode) in a responsive `.media-grid`, reinforcing *"every picture here is a real, licensed photo or map — never a pretend one."*
- `Docs` Add a real image = drop a licensed file at its `file` path, fill `credit` + `license`, set `status:"ready"` — the placeholder becomes the real thing with attribution shown.

---

## [0.10.1] — 2026-07-08 · Real Educational Media System

- `Added` **`MEDIA_POLICY.md`** — authentic photos/maps first for real places, animals, food & culture; original illustrations only for mascots/UI/decor/Bible narrative; quality, licensing, and no-hotlinking rules.
- `Added` **`media-manifest.js`** — registry & sourcing checklist of the authentic images the curriculum needs (maps, landmarks, animals, food, culture) with `alt`, `caption`, `credit`, `license`, local `file` path, and per-adventure mapping.
- `Added` **Resilient `mediaFigure()` component** — lazy-loaded local/cloud images with alt text, caption & credit; on failure it shows a graceful placeholder (family view stays clean) with teacher guidance in Teacher Mode. No hotlinking.
- `Docs` Real photos require sourcing/licensing (dropped into `assets/media/` or a cloud bucket); figures activate automatically once files are present.

---

## [0.10.0] — 2026-07-08 · Presentation Design Engine + Real Philippines Map

- `Added` **Presentation Design Engine** — one Wonder Journey identity (storybook paper, signpost, mascot, colored text) with a **per-adventure theme** that sets the sky, floating decorations and ground: Island, Geography, Ocean, Volcano, Rice Terrace, Cooking, Wildlife, Festival, Historical, Village & Bible Lands. Each adventure auto-selects its theme (explicit map + keyword inference), so **future adventures theme themselves** with no redesign.
- `Changed` The pinned lesson map is now an **accurate vector of the Philippines** — Luzon (with the Bicol peninsula), Mindoro, the long diagonal Palawan, the Visayan islands (Panay, Negros, Cebu, Bohol, Leyte, Samar) and Mindanao, in correct relative positions. *(Stylized vector, since live satellite/map tiles can't be loaded in-sandbox; a Google-Earth/real-tile layer is the documented future upgrade.)*

---

## [0.9.3] — 2026-07-08 · Warm Tropical Theater (reference match)

- `Changed` **Every scene is now bright, warm and lively** (matching the design reference) — tropical sky gradient, a swaying palm, drifting clouds, a sandy beach with a moving shoreline, and dark storybook text on light.
- `Added` **Pinned Philippines map postcard** on every lesson scene — a taped watercolor-style map with Luzon (green), Visayas (purple) & Mindanao (orange) tags and a little sailboat.
- `Added` **Reference-exact colored keywords & star bullets** in the Geography lesson (blue *Philippines*, red *7,641 islands*, green/purple/orange island groups, pink *Manila*, teal *Filipinos*).
- `Changed` Warm controls — kraft ribbon scene label, blue speaker + orange close buttons, brown storybook nav arrows, gold progress dots with a star; quiz options and the ending are now light warm cards.

---

## [0.9.2] — 2026-07-08 · Storybook Look & Feast-Day Respect

- `Changed` **Cinematic learn/missions/reflection scenes redesigned as a storybook** — cream paper lesson card with a dashed border, a wooden **signpost header**, a big rounded teal title, ⭐ **sticker bullets**, and larger child-friendly text — much closer to the design reference.
- `Added` Rounded child fonts (**Fredoka / Baloo 2 / Nunito**) for the hosted/local app (graceful fallback where webfonts are blocked).
- `Changed` **Holidays are now configurable & Feast-Day respectful** — the December unit was reframed to *Traditions & Family Celebrations (fully configurable)*; no Christmas/Easter crafts are assumed, honoring the family's observance of biblical Feast Days.
- `Documentation` Curriculum map notes the configurable-holiday policy.

---

## [0.9.1] — 2026-07-08 · Sinag the Mascot Guide

- `Added` **Sinag ☀️** — a friendly mascot guide in Cinematic Mode who waves hello, points at the map, encourages during the quiz, cheers correct answers, and celebrates at the ending (animated, with per-scene speech).
- `Added` Settings toggle **Mascot Guide (Sinag)** — on by default, can be turned off.
- `Accessibility` Mascot animations respect `prefers-reduced-motion`.

---

## [0.9.0] — 2026-07-08 · Cinematic Adventure Theater

**Summary:** Adventures can now play as an immersive, animated, scene-based story —
not a slideshow.

- `Added` **Cinematic Presentation Mode** ("🎬 Present as Story") — full-screen theater that plays each adventure as scenes (Welcome → Travel → Discover → Missions → Quiz → Reflection → Adventure Complete) with cinematic fade/zoom transitions.
- `Added` **Animated archipelago map** — ocean sky, drifting clouds, twinkling sparkles, a rotating globe, and Luzon/Visayas/Mindanao that glow in sequence and are **clickable to reveal** animals, food, culture, language & cities.
- `Added` **Sound design** — synthesized (Web Audio, CSP-safe) click / correct / wrong / stamp / celebrate cues, with a mute toggle; respects `prefers-reduced-motion`.
- `Added` In-theater **quiz** (one question per scene, big buttons, instant feedback) and a **sunset ending** with stats, stamp, badges, and "See you on our next adventure."
- `Added` **Google Earth launch hook** (stubbed) with the built-in animated map as the documented fallback.
- `Changed` Refactored completion into `awardCompletion()` so cinema and scroll modes share reward logic. The scroll view remains as the teacher/reading view — role separation preserved.

---

## [0.8.0] — 2026-07-08 · Full Curriculum Map (Step 1)

**Summary:** Planned and scheduled the entire World 1 curriculum, July → December 2026.

- `Added` **`CURRICULUM_MAP.md`** and **`curriculum-map.js`** — 72 Adventures across 13 Units, scheduled Mon/Tue/Fri from Jul 6 to **Dec 18, 2026** (last teaching week of December).
- `Added` Per-adventure **academic spine** — explicit Math, English, Bible-story, and character-Value focus so skills build gradually and stay tied to the adventure.
- `Improved` After an elementary-educator review: extended from 68→72 to reach the final December teaching week, and added a **Filipino Christmas & Traditions** unit (respectful, configurable) with the Nativity landing at Christmas.
- `Documentation` The map is the schedulable database skeleton for the future Teacher Portal (auto-unlock, Start Adventure). Full per-adventure content is authored unit by unit (Step 3); Units 1–9 flagship adventures already built (10/72).

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
