#!/usr/bin/env node
/* ============================================================
   WONDER JOURNEY OS — REAL MEDIA SOURCING TOOL
   Downloads AUTHENTIC, openly-licensed photos/maps from Wikimedia
   Commons for every entry in media-manifest.js, then fills in
   credit + license + status:"ready" automatically and writes an
   attribution report (CREDITS.md).

   SAFE LICENSES ONLY (commercial use permitted):
     Public Domain · CC0 · CC BY (any version) · CC BY-SA (any version)
   Anything else (NC, ND, unknown) is rejected. Attribution is stored
   in the manifest AND shown to learners by mediaFigure().

   USAGE (from the wonder-journey/ folder, Node 18+, open internet):
     node tools/source-media.mjs --dry-run          # preview choices, download nothing
     node tools/source-media.mjs                    # source every "needed" entry
     node tools/source-media.mjs --only mayon,tarsier
     node tools/source-media.mjs --redo mayon       # re-source even if "ready"

   After running: review the images, then commit assets/ + media-manifest.js
   + CREDITS.md. Re-run any ids you want swapped with --redo.
   Policy: REAL_MEDIA_POLICY.md — never hotlink; files live in assets/.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "media-manifest.js");
const UA = "WonderJourneyOS-MediaSourcer/1.0 (family education project; contact: repo owner)";
const WIDTH = 1200;               // downloaded thumb width (keeps repo lean)
const OK_LICENSES = /^(public domain|pd|cc0|cc[ -]by(-sa)?( \d(\.\d)?)?( .*)?)$/i;

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const only = (args[args.indexOf("--only") + 1] || "").split(",").filter(Boolean);
const redo = (args[args.indexOf("--redo") + 1] || "").split(",").filter(Boolean);

// Tuned search terms where the subject name alone is ambiguous on Commons.
const SEARCH = {
  "map-philippines": "Philippines location map provinces",
  "map-luzon": "Luzon island map Philippines",
  "map-visayas": "Visayas map Philippines",
  "map-mindanao": "Mindanao map Philippines",
  "map-world-asia": "Southeast Asia location map",
  "ring-of-fire": "Pacific Ring of Fire map",
  "ph-flag": "Flag of the Philippines",
  "sampaguita": "Jasminum sambac flower",
  "narra": "Pterocarpus indicus tree",
  "mayon": "Mayon Volcano cone",
  "taal": "Taal Volcano lake",
  "pinatubo": "Mount Pinatubo crater lake",
  "mountains": "Cordillera Central Luzon mountains",
  "banaue-terraces": "Banaue Rice Terraces",
  "chocolate-hills": "Chocolate Hills Bohol",
  "boracay": "Boracay White Beach",
  "palawan": "Puerto Princesa underground river Palawan",
  "ph-eagle": "Philippine eagle Pithecophaga",
  "tarsier": "Philippine tarsier Bohol",
  "carabao": "Carabao water buffalo Philippines",
  "rainforest": "Philippines rainforest forest",
  "coral-reef": "Coral reef Philippines fish",
  "tubbataha": "Tubbataha Reef",
  "sea-turtle": "Green sea turtle swimming reef",
  "clownfish": "Clownfish anemone",
  "giant-clam": "Giant clam Tridacna",
  "fishing-village": "Fishing boats bangka Philippines",
  "champorado": "Champorado chocolate rice porridge",
  "rice": "Cooked white rice bowl",
  "fruits": "Tropical fruits market Philippines",
  "mango": "Carabao mango Philippines fruit",
  "merienda": "Puto bumbong kakanin Filipino snack",
  "coconut": "Coconut palm tree fruits",
  "market": "Public market Philippines palengke",
  "seedling": "Rice seedlings paddy field",
  "farm": "Rice farm nipa hut Philippines",
  "fiesta": "Fiesta Philippines street banderitas",
  "sinulog": "Sinulog festival Cebu dancers",
  "ati-atihan": "Ati-Atihan festival Kalibo",
  "panagbenga": "Panagbenga festival Baguio flower float",
  "kulintang": "Kulintang gongs",
  "music-instruments": "Rondalla bandurria Philippines",
  "parol": "Parol Filipino star lantern",
  "bayanihan": "Bayanihan carrying house Philippines",
  "mano-po": "Mano po blessing Filipino gesture",
  "family": "Filipino family",
  "rizal": "Rizal Monument Luneta",
  "bonifacio": "Bonifacio Monument Caloocan",
  "manila": "Intramuros Manila",
  "cebu": "Magellan's Cross Cebu",
  "baguio": "Baguio pine trees city",
  "vigan": "Calle Crisologo Vigan",
  "davao": "Mount Apo Davao",
  "iloilo": "Molo Church Iloilo",
  "jeepney": "Jeepney Philippines colorful",
  "jobs": "Street vendor Philippines work",
  "sari-sari": "Sari-sari store Philippines",
  "tropical-weather": "Monsoon rain clouds Philippines",
  "bible-holyland": "Map of ancient Israel Holy Land",
  "bible-canaan": "Abraham journey map Ur Canaan",
  "bible-egypt": "Ancient Egypt map Nile",
  "bible-ararat": "Mount Ararat",
  "bible-sinai": "Mount Sinai Egypt mountains",
  "bible-galilee": "Sea of Galilee shore",
  "bible-nineveh": "Nineveh Adad gate ruins",
  "bible-jerusalem": "Jerusalem old city walls",
  "mango-float": "Mango float dessert Filipino",
  "banana-cue": "Banana cue Philippines",
  "puto": "Puto steamed rice cake Philippines",
  "adobo": "Chicken adobo Filipino dish",
  "halo-halo": "Halo-halo dessert",
};

async function api(params) {
  const url = "https://commons.wikimedia.org/w/api.php?format=json&origin=*&" + new URLSearchParams(params);
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error("API " + res.status);
  return res.json();
}
const strip = (h) => (h || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

async function findImage(term) {
  const j = await api({
    action: "query", generator: "search",
    gsrsearch: `filetype:bitmap ${term}`, gsrnamespace: 6, gsrlimit: 8,
    prop: "imageinfo", iiprop: "url|extmetadata|size|mime", iiurlwidth: WIDTH,
  });
  const pages = Object.values(j?.query?.pages || {}).sort((a, b) => a.index - b.index);
  for (const p of pages) {
    const ii = p.imageinfo?.[0]; if (!ii) continue;
    const m = ii.extmetadata || {};
    const lic = strip(m.LicenseShortName?.value || m.License?.value || "");
    if (!OK_LICENSES.test(lic)) continue;                       // safe licenses only
    if (!/^image\/(jpeg|png)$/.test(ii.mime || "")) continue;   // photos/maps as jpg/png
    if ((ii.width || 0) < 500) continue;                        // reject tiny images
    return {
      title: p.title, lic,
      artist: strip(m.Artist?.value || "Unknown author"),
      thumb: ii.thumburl || ii.url,
      page: ii.descriptionurl,
    };
  }
  return null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error("download " + res.status);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

// Load manifest in a sandbox to read entries.
const src = fs.readFileSync(MANIFEST, "utf8");
const sandbox = { module: { exports: {} } };
new Function("module", src + "\nmodule.exports = { MEDIA, ADVENTURE_MEDIA };")(sandbox.module);
const MEDIA = sandbox.module.exports.MEDIA;

let text = src;                       // manifest text we patch in place
const credits = [];
let done = 0, skipped = 0, failed = [];

for (const [id, m] of Object.entries(MEDIA)) {
  if (only.length && !only.includes(id)) continue;
  if (m.status === "ready" && !redo.includes(id)) { skipped++; continue; }
  const term = SEARCH[id] || m.subject;
  process.stdout.write(`• ${id.padEnd(18)} "${term}" … `);
  try {
    const hit = await findImage(term);
    if (!hit) { console.log("❌ no safely-licensed match"); failed.push(id); continue; }
    console.log(`${hit.lic} — ${hit.title.replace("File:", "").slice(0, 60)}`);
    if (!DRY) {
      await download(hit.thumb, path.join(ROOT, m.file));
      // Patch this entry: credit, license, status → ready (entry is one line in the manifest).
      // Append sourced fields at the end of the mk({...}) input — in JS object
      // literals the LAST duplicate key wins, so these override any earlier values.
      const entryRe = new RegExp(`("${id}":\\s*mk\\(\\{[^\\n]*?)\\}\\),`);
      text = text.replace(entryRe, (full, head) =>
        `${head}, credit:${JSON.stringify(hit.artist.slice(0, 120))}, license:${JSON.stringify(hit.lic)}, source:${JSON.stringify(hit.page)}, status:"ready" }),`);
      credits.push({ id, file: m.file, title: hit.title, artist: hit.artist, lic: hit.lic, page: hit.page });
      done++;
    }
    await new Promise(r => setTimeout(r, 400)); // be polite to the API
  } catch (e) { console.log("❌ " + e.message); failed.push(id); }
}

if (!DRY && done) {
  fs.writeFileSync(MANIFEST, text);
  // Attribution report (required for CC BY / CC BY-SA).
  const rows = credits.map(c => `| ${c.id} | [${c.title.replace("File:", "")}](${c.page}) | ${c.artist} | ${c.lic} |`).join("\n");
  const prev = fs.existsSync(path.join(ROOT, "CREDITS.md")) ? fs.readFileSync(path.join(ROOT, "CREDITS.md"), "utf8") : "";
  const header = prev.includes("# 📷 Media Credits") ? "" :
    "# 📷 Media Credits & Attribution\n\nAll real photos/maps in `assets/` with their authors and licenses (see REAL_MEDIA_POLICY.md).\nLicenses used permit commercial reuse with attribution: Public Domain · CC0 · CC BY · CC BY-SA.\n\n| id | source file | author | license |\n|---|---|---|---|\n";
  fs.appendFileSync(path.join(ROOT, "CREDITS.md"), header + rows + "\n");
}

console.log(`\n${DRY ? "DRY RUN — nothing downloaded." : ""}Sourced: ${done} · already ready: ${skipped} · no match/error: ${failed.length}${failed.length ? " → " + failed.join(", ") : ""}`);
if (failed.length) console.log("Tip: adjust the SEARCH term for failed ids, or add your own licensed photo at the manifest path and set status:\"ready\" manually.");
