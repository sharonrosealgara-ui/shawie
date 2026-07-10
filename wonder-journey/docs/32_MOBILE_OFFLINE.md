# 📱 Wonder Journey OS — Mobile App & Offline Learning

- **Version:** 1.0 · **Status:** Future-ready architecture (Phases 1–2 live) · **Priority:** Medium
- Governed by the [Constitution](../CONSTITUTION.md) · builds on docs 19/26/30/31

> Learning shouldn't stop when the internet does. Wonder Journey works at home, in
> a kitchen, while traveling, or anywhere connectivity is unreliable — without
> compromising licensing, privacy, or the two-portal architecture.

## Phased delivery (per spec — never delaying V1)
| Phase | Scope | Status |
|---|---|---|
| P0 | Responsive web (desktop/laptop/tablet/mobile browsers) | ✅ live |
| P1 | **Installable PWA + offline fallback** | ✅ **live (v0.28.0)** |
| P2 | Downloadable lesson packages, offline status labels, storage manager | 🔜 |
| P3 | Sync Engine (multi-device), media capture (photos/voice) | 🔜 SaaS |
| P4 | Optional native apps (framework chosen only after PWA proves out) | 🔜 |

## Live today ✅
- **PWA:** `manifest.webmanifest` (name, icons 192/512, standalone display, theme
  colors) + install-to-home-screen; app icon generated (🌏 on brand teal).
- **Offline:** `sw.js` service worker — cache-first app shell (all 5 code files +
  icons); same-origin media caches as it's viewed, so real photos become
  offline-available after first view. **Verified: with the network fully offline,
  the app reloads and boots completely** (39 adventures, all views). Registration
  is guarded (http/https only; silent no-op in the artifact preview).
- **Offline-complete by design:** progress, quizzes, reflections, cookbook,
  Lesson Builder all write to local storage — nothing requires a server. Missing
  media never breaks a lesson (resilient placeholders). Versioned cache
  (`wj-vX.Y.Z`) cleans old caches on update.
- **Responsive + touch:** flexible grids, large touch targets, no hover-required
  interactions, reduced-motion/sound support.

## SaaS-phase roadmap 🔜 (spec preserved)
Per-lesson download packages with size estimates + status labels (Online Only /
Downloading / Downloaded / Update Available…) · storage quota display & cleanup ·
**Sync Engine** (detect → validate → dedupe → resolve conflicts → confirm; friendly
statuses: Saved on Device / Waiting to Sync / Synced; never silently lose work;
no duplicate badges/certificates) · offline teacher presenter mode with timer ·
network-aware quality (low-res images, transcript-first on slow connections) ·
mobile media capture (preview → compress → caption → permission-checked upload) ·
notifications (opt-in, never excessive) · offline maps/video alternatives per
licensing · native apps + app-store compliance checklist (privacy policy, age
rating, parental consent) — decided only after real-user PWA testing.

## Security & privacy rules
Never cache secrets/passwords/admin pages · clear protected data on logout ·
validate all synced data server-side · camera/mic/photos/location only with
explicit, explained permission — and optional wherever possible.

## Mobile navigation (when dedicated mobile layouts land)
Learner: Home · Today's Adventure · Progress · Passport · Memories (rest in menu).
Teacher: Today · Lessons · Learners · Calendar · Notifications. Same two portals,
same core platform — responsive role-aware layouts, never separate portal logic.
