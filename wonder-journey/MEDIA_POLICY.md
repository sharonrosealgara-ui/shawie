# 🖼️ Media Policy — Wonder Journey OS

Wonder Journey helps children **recognize the real world**. Educational authenticity
always takes priority over decorative or fictional imagery.

---

## 1. Authentic media first `policy`

Whenever we teach **real** places, animals, plants, food, landmarks, or geography, use
**authentic photographs, real maps, and educational imagery** — never AI-generated or
fictional replacements.

Use real media for, e.g.:
- **Maps** — Philippines, Luzon, Visayas, Mindanao, provinces, cities.
- **Landmarks** — Mayon Volcano, Chocolate Hills, Banaue Rice Terraces, Boracay, Palawan, Siargao.
- **Animals** — Philippine eagle, tarsier, tamaraw, whale shark.
- **Food** — real Filipino dishes, ingredients, cooking tools.
- **Culture** — real festivals, cultural clothing, musical instruments.

## 2. When original illustrations are OK

Wonder Journey's **original** illustrations are for **decoration & narrative only**:
mascots, interface decorations, stickers, passport, scrapbook elements, speech bubbles,
badges, transitions, storybook decorations, fictional adventure scenes, and **Bible
story narrative scenes** (paired with real maps/locations where appropriate).

> ❌ Never replace real educational content with fictional artwork.
> ✅ The current in-app map is a **stylized vector placeholder** — it is scheduled to be
> replaced by a **real, licensed map** per this policy (see the manifest).

## 3. Image quality standard

Every educational image must be: high-resolution · bright · child-friendly · educational ·
accurate · **properly licensed/sourced** · optimized for fast loading · consistent with
Wonder Journey's look. Never blurry, stretched, pixelated, or misleading.

## 4. Accessibility & resilience (how it's engineered)

- **No hotlinking.** Images are stored under our control: a local **`assets/media/`**
  folder (or our cloud bucket — Supabase Storage / Cloudinary), never linked from a
  third-party site that could break or change.
- **Every image carries:** descriptive **alt text**, **attribution/credit** metadata,
  a **fallback placeholder**, and an optional **teaching caption**.
- **Graceful degradation.** If an image can't load, the lesson continues: a friendly
  placeholder shows (family view stays clean), and **teacher guidance** appears in
  Teacher Mode. Nothing crashes; the class flows on.

## 5. How it works in the code

- **`media-manifest.js`** — the registry of every authentic image the curriculum needs:
  `id, subject, kind, file (local path), alt, caption, credit, sourceHint, license`.
  This doubles as the **sourcing checklist**.
- **`mediaFigure(item)`** (in `app.js`) — renders a resilient `<figure>` with
  `loading="lazy"`, alt text, caption + credit, and an automatic placeholder on error.
- **To go live with real photos:** drop properly-licensed files into `assets/media/`
  (or the cloud bucket) using the paths in the manifest. No code changes needed — the
  figures light up automatically.

## 6. Sourcing guidance (suggested, verify license before use)

- **Public-domain / open-license:** Wikimedia Commons (check each file's CC license),
  government tourism/agency open data, NASA/USGS for satellite & relief maps.
- **Maps:** OpenStreetMap-based tiles / exports (ODbL — attribute "© OpenStreetMap
  contributors"), or licensed map providers on the hosted app.
- **Stock (paid, clean license):** for dishes, tools, instruments where open images are weak.
- Always record the **source, author, and license** in the manifest's `credit`/`license`
  fields before shipping an image.

---
*A Digital Solutions Studio project · Built with ❤️ for the Ferrell Family.*
