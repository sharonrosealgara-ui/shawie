# ✨ Wonder Journey OS — Master Premium Visual Directive

- **Version:** 2.0 (Final Art Direction) · **Status:** Active · Governed by the [Constitution](../CONSTITUTION.md) & [Design Bible](01_DESIGN_BIBLE.md)

## v2.0 — The official visual benchmark 🎨
The owner's approved premium mockup (illustrated Home page) is now the
**permanent design language** for the entire platform — every section, every
portal. Quality bar: *"Would this screen be believable as an official product
from Disney, National Geographic Kids, Apple Education, or Duolingo?"*

**Typography (canonical):**
- Headings — `"DM Serif Display"` (fallbacks: Fraunces, Fredoka, Baloo 2, serif),
  large editorial scale (Home hero clamps up to ~54px; grows per-surface).
- Body — `"Nunito Sans"` (fallbacks: Nunito, Segoe UI, system-ui).

**Every major page earns a cinematic hero:** editorial headline · warm welcome
line · decorative gold divider (`.hero-divider`) · artwork slot · primary +
secondary CTA.

**Illustrated art slots:** the layout ships with drop-in slots for painted
watercolor/storybook artwork (no clipart). Home hero expects
`assets/backgrounds/hero-philippines.jpg` (`.hero-art`, auto-hides if absent);
a passport-stamp watermark (`.hero-stamp`) anchors the World identity.
Real-photography policy (doc 05) is unchanged — illustration is for decorative
framing, photos remain authentic and licensed.

**Shipped in v0.30.0:** global serif heading system · captioned stat cards with
per-card label colors · Today's Adventure journey row (World card + Upcoming
Celebration card) · hero divider/stamp/art-slot. Next surfaces: Map, Passport,
Cooking Academy, Storybook, Teacher Portal heroes — one at a time, same
guardrail.

> Transform Wonder Journey into one of the most beautiful family educational
> platforms ever created — think Disney Imagineering · Nat Geo Kids · Duolingo ·
> Pixar · Ghibli · Nintendo · Canva · Airbnb. **Never** a dashboard, LMS, or admin
> template. **Owner's guardrail: no redesign for novelty** — every visual
> improvement must strengthen the warm, family-centered adventure-journal
> identity while keeping navigation intuitive, performance fast, and
> accessibility first.

## Quality bar
Parents say "wow"; children can't wait to explore; every screen passes:
**"Would a family happily pay for this experience?"**

## Polish pass v1 ✅ (v0.29.0 — identity-preserving, CSS-only + hero scenery)
- **Cinematic Home hero:** layered living scene behind the same greeting/CTAs —
  glowing sun, drifting clouds, flying doves, animated ocean waves, sailing
  bangka, swaying palm. Decorations are `aria-hidden`; content unchanged.
- **Living backgrounds:** soft warm radial glows on the content area (never flat,
  never distracting).
- **Premium sidebar:** gold selection indicator, gentle hover slide, icon
  micro-motion.
- **Story cards:** soft depth, collectible hover lift across cards/recipes/
  lessons/keepsakes.
- **Micro-interactions:** tactile button hover/press, stat-icon delight.
- **Accessibility kept first:** every new animation disabled under
  `prefers-reduced-motion`; no hover-required functionality; contrast preserved;
  pure-CSS transforms/opacity (60fps-friendly, no new assets or JS).

## Continuing program 🔜 (applied surface-by-surface, same guardrail)
Photo presentation upgrades (polaroids, museum labels, map pins — real photos +
illustrated framing) · Adventure Map as an animated travel path (compass, route,
pins) · per-world identity kits (doc 22's World Engine: Japan/France/Egypt/Space
palettes & textures) · richer celebration sequences (stamp ink-press, book-open,
certificate reveal) · premium empty/error states, splash & loading moments ·
professional logo & sticker system · Cooking Academy as a children's cooking-show
set · Storybook as a page-turning album. Every step evaluated against the Design
Bible checklist before shipping.
