# 🎞️ Wonder Journey OS — Animation System

- **Version:** 1.0 · **Status:** Active · **Priority:** High

> Animations are **not decorative** — they support storytelling, learning, focus,
> emotional engagement, and family interaction. Every movement has meaning; if an
> animation doesn't improve the experience, remove it. Wonder Journey should feel
> like an interactive Disney storybook, not a website. Governed by the
> [Constitution](../CONSTITUTION.md); pairs with the [Design Bible](01_DESIGN_BIBLE.md).

---

## Philosophy & principles
Motion guides learning and never distracts — children remember the story, not the
animation. Animations feel **warm · natural · gentle · storybook · cinematic ·
premium · family-friendly · hopeful.** Never flashy · chaotic · overwhelming ·
gratuitously game-like · corporate · mechanical. Inspiration: Disney · Pixar · Studio
Ghibli · storybooks · nature · paper craft · museum exhibits.

## Timing
| Class | Duration | Uses |
|---|---|---|
| Fast feedback | 150–250ms | buttons · hover · click · focus |
| Standard UI | 250–400ms | cards · dialogs · nav · menus |
| Storybook | 500–900ms | page turns · passport stamps · scene changes |
| Cinematic | 1000–2500ms | movie intro · celebrations · endings · flyovers (major moments only) |

**Easing:** ease-out · ease-in-out · gentle spring · natural motion. Avoid harsh linear.

## Transitions
Every transition feels like entering another chapter — storybook page turn · passport
flip · journal flip · cloud/watercolor fade · sunrise/sunset · treasure reveal · map
zoom · camera pan. Never instantly replace content; never harsh fade-ins everywhere.

## Characters (mascots)
Wave · blink · smile · celebrate · point · look · subtle jump · react to quiz answers
· welcome children · guide attention. Idle animations stay subtle.

## Environmental (loop gently)
Clouds · ocean waves · palm trees · leaves · butterflies · birds · fireflies · sun
rays · rain · festival lanterns · cooking steam · water ripples · wind.

## Feature motion
- **Maps:** zoom · pan · highlight · travel route · pins · compass rotation · region glow · journey lines (Earth → Asia → Philippines → Luzon → province → destination).
- **Passport:** stamp appears → ink presses → sound → XP → badge unlock (feels physical).
- **Badges:** slight spin · glow · sparkles · soft sound · XP · brief confetti.
- **Adventure Tree:** new branch grows → leaf → flower → fruit (future).
- **Quiz:** correct = bounce · glow · sparkle · XP; incorrect = gentle shake + encouraging message + retry. Never punish visually.
- **Cooking:** steam · mixing · pouring · timer · ingredient highlight · recipe page turn.
- **Bible:** peaceful — soft light · page turns · gentle glow · flowing water · swaying olive trees. No dramatic effects.
- **Celebrations:** confetti · balloons · cake · sparkles · stamp; milestones = badge shine · tree growth · certificate reveal · subtle fireworks.

## Microinteractions & camera
Buttons (hover/press/release) · cards (lift + shadow) · icons (gentle movement) ·
inputs (focus/validation). Camera: slow zoom · pan · focus · spotlight · scene reveal
— never rapid.

## Loading
Never generic spinners — use a compass · traveling boat · flying bird · butterfly ·
passport · backpack that reinforces the theme.

## Reduced motion (accessibility first)
Honor OS `prefers-reduced-motion`: disable parallax · large camera moves · continuous
loops; replace with simple fade/scale.

## Performance
Target 60 FPS · avoid unnecessary repaint · GPU-accelerate where appropriate ·
lazy-load heavy animations · pause off-screen animations.

---

## Quality checklist (remove/redesign if any NO)
✓ Helps learning? ✓ Supports storytelling? ✓ Guides attention? ✓ Calm? ✓ Beautiful?
✓ Accessible? ✓ Consistent? ✓ Feels like Wonder Journey?

> Motion is part of the curriculum. Wonder Journey should never feel like *software
> with animations* — it should feel like an **animated educational world.**
