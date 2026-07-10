# 📷 Media Sourcing Runbook — Real Licensed Photos

- **Status:** Tool ready · assets pending download · Governed by [REAL_MEDIA_POLICY](../REAL_MEDIA_POLICY.md)

## The one-command pipeline (✅ built: `tools/source-media.mjs`)
Sources an authentic, **safely-licensed** image for every `needed` entry in
`media-manifest.js` from Wikimedia Commons, then updates everything automatically:

1. Searches Commons with a curated term per asset (71 tuned terms included).
2. **License gate:** accepts ONLY Public Domain · CC0 · CC BY · CC BY-SA
   (all permit commercial reuse with attribution). NC/ND/unknown → rejected.
3. Downloads a 1200px copy to the exact `assets/…` path (never hotlinks).
4. Writes `credit` (author), `license`, `source` (page URL), `status:"ready"`
   into the manifest — `mediaFigure()` then shows the real photo **with visible
   attribution** in every lesson.
5. Appends an attribution table to `CREDITS.md` (required for CC BY/BY-SA).

## How to run it (on any computer with Node 18+ and open internet)
```bash
git clone <repo> && cd shawie/wonder-journey     # or open your existing clone
node tools/source-media.mjs --dry-run            # preview picks, downloads nothing
node tools/source-media.mjs                      # source everything "needed"
node tools/source-media.mjs --redo mayon,tarsier # swap any image you don't love
```
Then **review every image** (right subject? child-appropriate?), and commit
`assets/` + `media-manifest.js` + `CREDITS.md`. Netlify redeploys automatically —
real photos appear in all lessons with credits.

> ⚠️ This sandbox's network policy blocks image sites (Wikimedia = 403), so the
> tool must run on your machine — or in a session whose environment allows
> general web access. Everything else is automated.

## Human review checklist (before committing)
- ✅ Image shows the **right real subject** (it's Mayon, not another volcano)
- ✅ Child-appropriate, good quality
- ✅ License column in `CREDITS.md` says PD / CC0 / CC BY / CC BY-SA
- ✅ People who are identifiable: prefer crowd/public-event shots; swap portraits
  of private individuals (use `--redo id` or your own photo with permission)

## Your own photos (always welcome — best for food & family)
Drop a photo at the manifest's `file` path, then in `media-manifest.js` add to the
entry: `credit:"Photo: Ferrell family", license:"Own photo — all rights reserved",
status:"ready"`. Own photos are ideal for Cooking Academy dishes and keepsakes.

## Videos 🔜
No `<video>` elements exist in the app yet. When video lessons arrive: same rules —
self-hosted files only (no YouTube hotlinks in lessons), licenses recorded in the
manifest, captions required. Recommended sources: own recordings, PD/CC footage
(e.g., NASA, Wikimedia video). A `videos/` manifest section will be added with the
feature.
