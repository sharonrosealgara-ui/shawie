# Wonder Journey OS — Real Educational Media Policy

**Status:** Production standard · **Applies to:** every lesson, July–December 2026 (World 1 — Discover the Philippines) and all future worlds.

Wonder Journey OS teaches real children about a real country and real Scripture.
The media they see must be **truthful**. This document is the rule of law for
every image, map, and illustration that ships in the product.

---

## 1. The One Rule

> **Real things are shown with real, licensed media. We never fabricate reality.**

If a child could point at the screen and say *"is that the real Mayon Volcano?"*,
the answer must be **yes**. That means:

- ✅ Authentic photographs and real cartographic maps for anything that exists in
  the world: places, landmarks, maps, animals, food, plants, festivals, people,
  and real Bible-era geography.
- ❌ **No AI-generated, invented, or "artist's impression" images that pose as
  reality.** We do not generate a fake Mayon, a fake tarsier, a fake Banaue, a
  fake map, or a fake photo of a real festival — ever.

Until a real, licensed file is added, the lesson shows an honest **placeholder**
(see §6). A placeholder that says *"real photo coming"* is acceptable. A
convincing fake is not.

---

## 2. What MUST be a real photo or real map

These categories are **`real: true`** in the manifest. AI generation is
**forbidden** for them.

| Category | Examples | Where it lives |
|---|---|---|
| **Maps** | Philippines, Luzon/Visayas/Mindanao, world→Asia, Ring of Fire, city maps | `assets/philippines/maps/`, `assets/bible/maps/` |
| **Landmarks** | Chocolate Hills, Vigan, Rizal monuments, Manila, cities | `assets/philippines/landmarks/` |
| **Volcanoes & mountains** | Mayon, Taal, Pinatubo, highlands | `assets/philippines/volcanoes/` |
| **Rice terraces** | Banaue, Batad | `assets/philippines/rice-terraces/` |
| **Beaches & seas** | Boracay, Palawan, Coral Triangle | `assets/philippines/beaches/` |
| **Animals** | Philippine eagle, tarsier, carabao, whale shark, sea turtle | `assets/animals/` |
| **Food** | Champorado, rice, mango, coconut, merienda | `assets/food/` |
| **Festivals & culture** | Sinulog, Ati-Atihan, Panagbenga, parol, kulintang | `assets/festivals/` |
| **National symbols** | Flag, sampaguita, narra | `assets/philippines/landmarks/` |
| **Real Bible geography** | Sea of Galilee, Mt. Sinai region, Jerusalem, Nineveh | `assets/bible/locations/`, `assets/bible/maps/` |

**Rule of thumb:** *If it exists (or existed) and can be photographed or mapped,
it must be a photograph or a map.*

---

## 3. When illustrations ARE allowed

Illustration is welcome where there is **no single real thing to photograph** —
it is honest because nobody mistakes it for a photo:

- **Bible narrative scenes** (e.g., "Jesus feeds the 5,000," "Noah's Ark"). No
  photograph of the event exists; a clearly-drawn illustration is appropriate.
  These are marked **`real: false`** in the manifest.
- **Mascot art** (Sinag and friends), **stickers**, **badges**, **icons**, and
  **decorative backgrounds** — obviously stylised, never mistaken for reality.
- **Diagrams** that teach a concept (water cycle, seed→harvest), clearly drawn
  as diagrams and labelled as such.

Even here: an illustration of a Bible **place** should still respect real
geography (a Galilee scene should look like the real lakeside region), and any
map behind it must be a real map. **Illustrate the story; never fake the place.**

---

## 4. Licensing & attribution (required before shipping any real image)

No real image ships without a clear licence. Acceptable sources, in order of
preference:

1. **Public domain / CC0** — museums, government open data, older public-domain photos.
2. **Creative Commons (CC BY / CC BY-SA)** — Wikimedia Commons, Flickr Commons.
   Attribution is **mandatory** and stored in the manifest.
3. **Purchased/licensed stock** — with a licence that permits commercial use and
   redistribution in an educational product.
4. **Own photography** — family or partner photos, with written permission.

For every real image you must fill, in `media-manifest.js`:

- `credit` — photographer / author / institution (e.g., `"Photo: Juan dela Cruz"`).
- `license` — the exact licence (e.g., `"CC BY-SA 4.0"`, `"CC0"`, `"Licensed stock — Ferrell family"`).
- `status: "ready"` — only flip to `ready` once `file`, `credit`, and `license`
  are all present and verified.

**Attribution is displayed to the learner** (in the image caption) and retained
in the source. Government seals, flags of state, and trademarked festival logos
follow their own usage rules — verify before use. Photos of **identifiable
children or private individuals** require a model/parental release.

---

## 5. No hotlinking, ever

- Images load **only** from our own `assets/` folder (local) or our own licensed
  cloud bucket. We **never** hotlink to Wikipedia, Google, a blog, or any third
  party at runtime.
- Sourcing a file (downloading it under its licence into `assets/`) is a
  deliberate, one-time editorial step — not a live fetch. This keeps the app
  fast, offline-capable, licence-clean, and free of broken external links.
- The published artifact runs under a strict Content-Security-Policy that blocks
  external images by design; the resilient component (§6) is what keeps lessons
  running there.

---

## 6. The placeholder promise (resilient by design)

Because real, licensed media is added over time, **every lesson must run
beautifully even when a file is missing.** The `mediaFigure()` component
guarantees this:

- Loads the local/cloud file only; if it is absent or blocked, it shows a warm
  **fallback card** (emoji + subject + short description) instead of a broken image.
- Always renders the **alt text**, **caption**, and **credit** we already know.
- In **Teacher Mode**, shows the **`teacherGuidance`** note: exactly which file to
  add, where, and what source/licence to look for.
- The lesson, quiz, and story continue uninterrupted. A missing photo never
  breaks a class.

A placeholder is a promise, not a defect: *"a real, licensed photo belongs here,
and here's how to add it."*

---

## 7. Adding a real image — the checklist

1. Find an authentic photo/map from an approved source (§4).
2. Confirm the licence permits **commercial + redistribution** use.
3. Save it to the exact `file` path in the manifest (see `assets/` tree).
4. Fill `credit` and `license` in `media-manifest.js`.
5. Set `status: "ready"`.
6. Reload the lesson — the placeholder is now the real thing, with attribution shown.

No AI shortcuts. No stand-ins for real places. When in doubt, ship the honest
placeholder and keep sourcing. This is what makes Wonder Journey OS safe to sell
to real families teaching real children.
