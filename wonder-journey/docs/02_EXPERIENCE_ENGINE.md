# 🎬 Wonder Journey OS — Experience Engine

- **Version:** 1.0 · **Status:** Active

> How adventures are *experienced*: the Adventure Theater and the three engines that
> make every lesson cinematic, themed, and varied. Governed by the
> [Constitution](../CONSTITUTION.md); visuals follow the [Design Bible](01_DESIGN_BIBLE.md);
> pedagogy detail lives in [PEDAGOGY.md](../PEDAGOGY.md) and
> [AGE_FRAMEWORK.md](../AGE_FRAMEWORK.md).

---

## Adventure Theater
A fullscreen, Canva-style presentation player (not slides, not scrolling). One
scene fills the screen; the child advances scene by scene. Teacher controls are
hidden from Family View. Built by `openCinema()` → `buildScenes()` →
`renderScene()`/`renderCine()`.

## Scene Engine
Reusable, composable scene layouts selected per adventure so no two lessons feel
identical:

`intro → map (interactive) → gallery (real photos) → learn (storybook pages) →
missions (age tiers) → yourway (per-child personalization) → quiz → reflect →
ending (celebration)`

Each scene type has its own renderer and mascot line. New scene types are added
centrally and become available to all adventures.

## Theme Engine
`themeFor(adventure)` assigns one of 11 environments — Island · Geography · Ocean ·
Volcano · Rice Terraces · Cooking · Wildlife · Festival · History · Village · Bible
Lands — via an explicit map then keyword inference. A theme changes sky, ambient
decoration, ground, and accent **without changing Wonder Journey's identity**, so
future adventures theme themselves.

## Presentation Design Engine
One handcrafted storybook identity (paper card, signpost, mascot, colored keywords,
kraft ribbon labels, floaty decor) rendered consistently across every theme.

## Age Differentiation
`LEVEL_TIERS` (Explorer 7–8 · Adventurer 9–10 · Trailblazer 11–12) and
`LEVEL_MISSIONS` give every adventure tiered missions; the Personalization Engine
adds per-child activities. Everyone learns the same topic, their own way.

## Sound & Motion
Optional synthesized SFX (correct answer, stamp, celebrate) with mute; ambient
motion (clouds, sparkles, waves) tuned to be calm and meaningful, with
reduced-motion respect as a standard.

---

*This document consolidates the shipped engines; see
[06_ARCHITECTURE](06_ARCHITECTURE.md) for the code-level view.*
