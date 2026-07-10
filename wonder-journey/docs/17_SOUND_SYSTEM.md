# 🔊 Wonder Journey OS — Immersive Cinematic Sound System

- **Version:** 1.0 · **Status:** Active (core shipped) · Governed by the
  [Constitution](../CONSTITUTION.md) & [Animation System](15_ANIMATION_SYSTEM.md)

> Sound is part of the curriculum — it guides learning, supports storytelling, and
> builds emotional memories. Silence matters too: quiet reflection is intentional.
> Wonder Journey remains **fully usable with sound off.**

---

## Sound Director (✅ live)
One centralized engine (`SND` in `app.js`) — **no page or component plays audio
independently.** Web Audio graph: `master → { ambient, ui }` channels (music /
narration / voice channels reserved in the architecture). Handles volumes,
crossfades, persistence (`S.sound`), reduced-sound mode, and teardown.

- **All audio is synthesized** (oscillators + filtered noise) — CSP-safe, zero
  external files, nothing to license, instant load. When real recorded
  music/ambience is added later, it drops into the same channels.
- Legacy `sfx*` helpers now route through the Director's `ui` channel.

## Adaptive Sound Engine (✅ live)
`SND.startAmbient(themeId)` builds a gentle environment per adventure theme and
**crossfades** in/out (never abrupt):

| Theme | Environment |
|---|---|
| Ocean / Island / Geography | low waves (LFO noise) + occasional gulls |
| Volcano | wind + faint low rumble |
| Rice Terraces / Village | stream trickle + breeze + birds |
| Wildlife | forest bed + bird calls |
| Cooking | kitchen hiss + bubbling pot |
| Festival | soft distant drum pulse |
| Bible Lands | gentle sine pad (G–B–D) + breeze |
| History / default | calm breeze |

Wired into the Adventure Theater: starts on `openCinema` (per `themeFor`), fades on
close, obeys the theater 🔊/🔇 button. All beds are deliberately quiet (calm > flashy).

## Signature sounds (✅ live)
Page turn (whoosh) · reward chime (correct) · gentle retry (never harsh) · passport
stamp/ink press · celebration arpeggio · **memory-saved chime** (cookbook keepsake) ·
milestone confetti moments.

## Sound Studio mixer (✅ live — Settings)
Mute-all · **Reduced Sound Mode** (only brief soft cues, no continuous ambience) ·
sliders for Master / Ambient / Effects · preview chime · preferences persisted.

## Accessibility (✅)
Mute + reduced mode + independent volumes + fully-functional-without-sound. Captions/
transcripts apply to the future narration/video layer.

## Performance (✅)
No audio files to load; nodes are created per environment and fully disconnected on
stop; timers cleared; single shared AudioContext.

## Roadmap 🔜 (needs real recorded/licensed assets or SaaS features)
Music library (composed tracks per category) · narration engine (play/pause/speed/
captions/transcript, never autoplay) · mascot voice clips (Tala/Lila/Kiko/Isla/
Agila/Coco) · video ducking · **Family Voice Memories** (mic recordings attached to
Storybook/Cookbook/Recipe Box — needs persistent storage beyond localStorage) ·
richer per-scene scoring · Motion-Director sync hooks for page-turn/stamp animations.
