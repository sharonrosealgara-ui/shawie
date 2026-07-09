# 🧩 Wonder Journey OS — UI Component Library

- **Version:** 1.0 · **Status:** Active · **Priority:** High

> Defines every reusable UI component so every screen feels like **one product**.
> Never create a brand-new button, card, modal, or layout unless it first becomes
> part of this library. If a component does not exist here, add it here before
> implementing it. Follows the [Design Bible](01_DESIGN_BIBLE.md); the
> [Constitution](../CONSTITUTION.md) always wins.

---

## Design philosophy
Components should feel **warm · handcrafted · child-friendly · premium · tactile ·
magical · storybook-inspired.** Avoid corporate UI, flat enterprise components,
business dashboards, generic cards.

## Global design rules
Every component must have: ✓ rounded corners · ✓ soft shadows · ✓ large touch
targets · ✓ friendly typography · ✓ smooth animations · ✓ accessible · ✓ responsive
· ✓ reusable.

---

## Button system
| Button | Purpose | Look | Status |
|---|---|---|---|
| **Primary** (`.btn-primary`) | Main actions (🎬 Start Adventure, ▶ Continue) | large · rounded · gradient · shadow · hover/press animation · optional icon | ✅ |
| **Secondary** (`.btn-ghost`, `.btn-ocean`) | Back · Skip · Close · Open Map | lighter, still rounded/tactile | ✅ |
| **Storybook** (decorative) | 🛂 Stamp Passport · 🎒 Open Backpack · 🍳 Cooking Time · 🏅 Earn Badge | wood/paper/treasure/adventure textures | 🟡 partial (signpost/kraft styles) |

## Card system
| Card | Contains | Status |
|---|---|---|
| **Adventure Card** | illustration · title · short description · difficulty · est. time · button | ✅ |
| **Passport Card** | stamp · country · date · adventure · XP · badge | ✅ |
| **Badge Card** | badge · description · unlocked date · XP · animation | ✅ (date/anim 🟡) |
| **Recipe Card** | photo · ingredients · time · difficulty · measurements · nutrition · print | 🟡 (photo/nutrition/print pending) |
| **Reflection Card** | question · journal area · drawing area · voice (future) | 🟡 (journal ✅; drawing/voice future) |
| **Character Card** | mascot · speech bubble · emotion · action · hint | ✅ (Sinag; six-mascot cast pending) |
| **Family Card** | member · photo · birthday · achievements · favorite activities | ✅ (photo 🟡) |
| **Lesson Card** (`.lesson-card`) | expandable plan: objective · subjects · materials · personalization · copy | ✅ |
| **Progress / Stat Card** (`.card.stat`, `.prog-hero`) | metric · label · icon · ring | ✅ |
| **Timeline Entry** (`.tl-item`) | dot · title · date · detail | ✅ |
| **Kid Card** (`.kid-card`) | child · icon · tag · activity | ✅ |

## Storybook components
Paper page · notebook · passport · scrapbook · journal · sticky note · speech
bubble · handwritten note · bookmark ribbon · washi tape · paper clip · folded
corner. *(Paper card, signpost, postcard/tape, kraft ribbon ✅; more accents 🟡.)*

## Map components
Interactive map · country/province card · city marker · travel route · compass ·
legend · zoom controls · location pin · photo popup · fact card · mini quiz.
*(Interactive island map + real PH vector ✅; province/zoom/route 🟡.)*

## Quiz components
Question card ✅ · answer buttons ✅ · score card ✅ · XP reward ✅ · drag-and-drop ·
picture match · map match · timeline · sorting · treasure hunt · word search ·
crossword · spinner wheel *(alternate types 🔲 planned via the Quiz Engine).*

## Celebration components
Birthday banner ✅ · confetti ✅ · subtle fireworks 🟡 · passport stamp ✅ · badge
unlock ✅ · adventure-complete banner ✅ · **certificate ✅** · photo frame 🟡 ·
memory card ✅ · celebration modal ✅.

## Cooking components
Recipe book ✅ · ingredient card ✅ (Teacher Portal) · measurement card 🟡 · kitchen
timer 🟡 · shopping list 🟡 · kitchen-safety card 🟡 · nutrition card 🔲 · step card
🟡 · photo gallery 🟡 · cooking badge ✅.

## Bible components
Bible timeline 🟡 · Bible map ✅ (manifest) · character card 🟡 · memory-verse card
(optional) 🔲 · reflection card ✅ · prayer card ✅ (blessings) · ancient-location
card ✅ (media) · story scene ✅.

## Progress components
Adventure tree ✅ · XP progress ✅ · level bar ✅ · passport ✅ · journey timeline ✅ ·
completed adventures ✅ · current mission ✅ · next destination ✅.

## Family components
Family timeline ✅ · memory gallery 🟡 · photo album 🔲 · adventure journal ✅ ·
storybook ✅ · cookbook ✅ · birthday calendar ✅ · milestones ✅.

## Modals
Adventure intro ✅ · adventure complete ✅ · quiz results ✅ · badge earned ✅ ·
birthday ✅ · certificate ✅ · celebration ✅ · settings ✅ · confirmation 🟡.

## Sidebar
Home · Adventure Map · Passport · Badges · Celebrations · Adventure Tree ·
Cookbook · Storybook · Parent Dashboard · Teacher Portal · Our Family · Settings.
*(Adventure Theater launches from adventures; Memory Gallery 🟡.)*

## Header / topbar
Logo ✅ · level ✅ · XP progress ✅ · stat chips (⭐/🛂/🏅) ✅ · fullscreen ✅ ·
theme toggle ✅ · adventure title (in Theater) ✅ · weather theme (future) 🔲.

## Footer / theater controls
Previous ✅ · Next ✅ · adventure progress dots ✅ · mute ✅ · fullscreen ✅ ·
accessibility 🟡 · music controls 🟡.

## Animation library
Hover · press · fade · slide · page turn · passport stamp · badge shine · cloud
drift · ocean wave · leaf float · butterfly/bird fly · compass spin · treasure open
· tree grow · sparkles · sun rays · fireflies · cooking steam. **Must remain
subtle.** *(Clouds, sparkles, waves, confetti, decor float ✅; page-turn/stamp 🟡.)*

## Iconography
Rounded, friendly icons (🏝 🌋 🦅 🦋 🌊 🍳 📖 🛂 🏅 🌳 🧭 🎒 🎨 🔬 📸 🎉). Prefer
custom illustrated icons over generic packs where possible.

## Accessibility (every component)
Keyboard support · screen-reader labels · alt text · reduced-motion support ·
color-contrast compliance · touch-friendly size · focus states.

## Responsive rules
Desktop · laptop · tablet · Presentation Mode · future mobile — every component
adapts appropriately.

---

## Component review (before adding any new component)
1. Does a similar component already exist?
2. Can an existing component be reused?
3. Can it become part of this library?

> Avoid duplicate UI patterns. The library exists so Wonder Journey always feels
> like **one beautifully crafted world** — every button, card, modal, map,
> animation, and interaction should instantly feel like Wonder Journey.
