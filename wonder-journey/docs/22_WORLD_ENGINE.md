# 🌏 Wonder Journey OS — World Engine

- **Version:** 1.0 · **Status:** Active (World 1 live)

> The engine that makes Wonder Journey scale beyond the Philippines: a **World** is
> a complete, self-contained curriculum universe. Everything above the data layer
> (Theater, Theme/Scene engines, Personalization, Media Library, Passport, Teacher
> Portal, Cooking Academy) is world-agnostic and drives whatever world is loaded.

## Model (✅ live)
`World → Units → Adventures` (`CURRICULUM_MAP` + authored `ADVENTURES`), plus
world-scoped data: media manifest ids · recipes · badges · stamps · themes ·
level missions · personalization library. **World 1 — Discover the Philippines:**
72 adventures / 13 units / Jul–Dec 2026.

## Adding a world (data, not code)
1. New `curriculum-map` (schedule + metadata) and authored adventures.
2. World-scoped media manifest entries + `assets/<world>/…` files.
3. Recipes, badges/stamps, and theme additions as needed (Theme Engine accepts new
   environments centrally).
4. `WJ_CONFIG.worldLabel` + map component for the region.
Everything else — engines, portals, rewards, celebrations — just works.

## Roadmap 🔜
World selector UI · per-world passports/certificates · multi-world progress ·
World 2 (country TBD by owner) · language packs per world · marketplace worlds
(commercial), all on the same contracts.
