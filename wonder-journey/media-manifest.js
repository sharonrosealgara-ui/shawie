/* ============================================================
   WONDER JOURNEY OS — MEDIA MANIFEST
   The registry of AUTHENTIC educational images the curriculum needs
   (see MEDIA_POLICY.md). Also the sourcing checklist.

   Rules:
   - `file` is a LOCAL path under assets/media/ (or our cloud bucket) — never a hotlink.
   - Fill `credit` + `license` before shipping any image.
   - `mediaFigure()` renders these with alt text, caption, credit, lazy-loading,
     and a graceful placeholder if the file is missing.
   Status: `needed` = to be sourced/licensed · `ready` = file present & licensed.
   ============================================================ */
const MEDIA = {
  // ---- Maps (real) ----
  "map-philippines": { subject: "Map of the Philippines", kind: "map", file: "assets/media/maps/philippines.jpg", alt: "Political map of the Philippines showing Luzon, Visayas and Mindanao", caption: "The Philippines — 7,641 islands in Southeast Asia.", credit: "", license: "", sourceHint: "OpenStreetMap export (ODbL) or gov open data", status: "needed" },
  "map-luzon":       { subject: "Map of Luzon", kind: "map", file: "assets/media/maps/luzon.jpg", alt: "Map of Luzon island group", caption: "Luzon — the largest island group, in the north.", credit: "", license: "", sourceHint: "OpenStreetMap / Wikimedia Commons", status: "needed" },
  "map-visayas":     { subject: "Map of the Visayas", kind: "map", file: "assets/media/maps/visayas.jpg", alt: "Map of the Visayas islands", caption: "The Visayas — the central islands.", credit: "", license: "", sourceHint: "OpenStreetMap / Wikimedia Commons", status: "needed" },
  "map-mindanao":    { subject: "Map of Mindanao", kind: "map", file: "assets/media/maps/mindanao.jpg", alt: "Map of Mindanao island group", caption: "Mindanao — the southern island group.", credit: "", license: "", sourceHint: "OpenStreetMap / Wikimedia Commons", status: "needed" },

  // ---- Landmarks (real photos) ----
  "mayon":        { subject: "Mayon Volcano", kind: "landmark", file: "assets/media/landmarks/mayon.jpg", alt: "Mayon Volcano's near-perfect cone in Albay", caption: "Mayon Volcano, Albay — famous for its almost perfect cone.", credit: "", license: "", sourceHint: "Wikimedia Commons (verify CC license)", status: "needed" },
  "chocolate-hills": { subject: "Chocolate Hills", kind: "landmark", file: "assets/media/landmarks/chocolate-hills.jpg", alt: "The Chocolate Hills of Bohol", caption: "The Chocolate Hills, Bohol — over 1,200 grassy hills.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
  "banaue":       { subject: "Banaue Rice Terraces", kind: "landmark", file: "assets/media/landmarks/banaue.jpg", alt: "The Banaue Rice Terraces in Ifugao", caption: "Banaue Rice Terraces, Ifugao — carved by hand ~2,000 years ago.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
  "boracay":      { subject: "Boracay", kind: "landmark", file: "assets/media/landmarks/boracay.jpg", alt: "White Beach in Boracay", caption: "Boracay — famous white-sand beaches.", credit: "", license: "", sourceHint: "Wikimedia Commons / tourism open data", status: "needed" },
  "palawan":      { subject: "Palawan", kind: "landmark", file: "assets/media/landmarks/palawan.jpg", alt: "Palawan's underground river and limestone cliffs", caption: "Palawan — 'the last frontier'.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
  "siargao":      { subject: "Siargao", kind: "landmark", file: "assets/media/landmarks/siargao.jpg", alt: "Palm-lined island of Siargao", caption: "Siargao — surfing island in the southeast.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },

  // ---- Animals (real photos) ----
  "ph-eagle":  { subject: "Philippine Eagle", kind: "animal", file: "assets/media/animals/philippine-eagle.jpg", alt: "A Philippine eagle, the national bird", caption: "The Philippine eagle — one of the world's largest eagles.", credit: "", license: "", sourceHint: "Wikimedia Commons (verify CC)", status: "needed" },
  "tarsier":   { subject: "Philippine Tarsier", kind: "animal", file: "assets/media/animals/tarsier.jpg", alt: "A Philippine tarsier with large round eyes", caption: "The tarsier — a tiny primate of Bohol.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
  "tamaraw":   { subject: "Tamaraw", kind: "animal", file: "assets/media/animals/tamaraw.jpg", alt: "A tamaraw, the dwarf buffalo of Mindoro", caption: "The tamaraw — found only on Mindoro.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
  "whale-shark": { subject: "Whale Shark (Butanding)", kind: "animal", file: "assets/media/animals/whale-shark.jpg", alt: "A whale shark swimming", caption: "The butanding (whale shark) — a gentle giant.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },

  // ---- Food (real photos) ----
  "champorado": { subject: "Champorado", kind: "food", file: "assets/media/food/champorado.jpg", alt: "A bowl of champorado (chocolate rice porridge)", caption: "Champorado — sweet chocolate rice porridge.", credit: "", license: "", sourceHint: "Wikimedia Commons / licensed stock", status: "needed" },
  "mango":      { subject: "Philippine Mango", kind: "food", file: "assets/media/food/mango.jpg", alt: "Sliced ripe Philippine mango", caption: "Sweet Philippine mangoes.", credit: "", license: "", sourceHint: "Wikimedia Commons / licensed stock", status: "needed" },

  // ---- Culture (real photos) ----
  "sinulog":    { subject: "Sinulog Festival", kind: "culture", file: "assets/media/culture/sinulog.jpg", alt: "Dancers at the Sinulog Festival in Cebu", caption: "Sinulog Festival, Cebu.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
  "kulintang":  { subject: "Kulintang", kind: "culture", file: "assets/media/culture/kulintang.jpg", alt: "A kulintang set of small gongs", caption: "The kulintang — a row of small gongs.", credit: "", license: "", sourceHint: "Wikimedia Commons", status: "needed" },
};

// Which media each built adventure would show (activate as licensed files arrive).
const ADVENTURE_MEDIA = {
  a1: ["map-philippines"],
  a2: ["map-luzon", "map-visayas", "map-mindanao"],
  a3: ["champorado"],
  a5: ["sinulog", "kulintang"],
  a6: ["mayon"],
  a7: ["ph-eagle", "tarsier", "whale-shark"],
  a8: ["banaue"],
  a9: ["whale-shark"],
  a10: [],
};

if (typeof module !== "undefined") module.exports = { MEDIA, ADVENTURE_MEDIA };
