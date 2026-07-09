# 👨‍🍳 Wonder Journey OS — Cooking Academy

- **Version:** 1.0 · **Status:** Active (core shipped; extensions in progress)

> Cooking is one of the four core pillars (with Language, Culture, Geography,
> Academics). The Cooking Academy is **not a recipe list** — each recipe is a full
> studio lesson that teaches language, history, culture, geography (real maps),
> math, science, nutrition, and family values through food. Governed by the
> [Constitution](../CONSTITUTION.md), [Content Style Guide](11_CONTENT_STYLE_GUIDE.md),
> and [Real Media Policy](../REAL_MEDIA_POLICY.md).

---

## Architecture (modular & extensible)
- **`recipes.js`** — `RECIPES` (data) + `COOKING_BADGES`. A recipe is pure data:
  `id, name, emoji, category, difficulty, time, region, mapRegion, media{finished,
  ingredients}, badge, stamp, xp, story, history, funFact, language[{en,tl,hil}],
  tools[], safety, ingredients[], steps[], math, science, nutrition,
  activities{Rylee,Ezra,Asa,Selah}, challenge, quiz[]`. **Adding a recipe (or a
  whole new world cuisine) is just more data — no code changes.**
- **`app.js`** — `viewCooking()` (recipe library), `openRecipe()` (studio lesson),
  `cookAnswer()` (playful quiz), `openCookComplete()` + `finishRecipe()`
  (completion → auto Family Cookbook keepsake + badge + XP + celebration).
- **State** — `S.cookbookEntries[]` keepsakes: `{recipeId, name, emoji, date,
  participants, rating, favorite, gratitude, notes, region, badge, stamp, xp}`.
- **Integrations** — Theme (Cooking Studio look), Media Library (resilient dish
  placeholders), Badges (9 cooking badges merged into `BADGES`), Family Cookbook
  (auto keepsake pages), real Philippines map (`phPostcard`), Personalization
  Engine (per-child activities). Reuses existing components — no one-offs.

## Each recipe lesson includes ✅
Movie-style story · history & origin · fun fact · **real-map geography** · **real
educational media** (finished dish + ingredients, graceful placeholders) ·
**language (English · Tagalog · Hiligaynon)** · ingredients · kitchen tools ·
**kitchen safety** · numbered cooking steps · **math** · **science** · **nutrition**
· **per-child activities** · **family challenge** · **playful quiz** · completion
celebration (confetti) · **cooking badge** · **XP** · **auto Family Cookbook entry**.

## Recipes shipped (v1) ✅
Mango Graham Float · Banana Cue · Puto · Chicken Adobo · Halo-Halo.
*(Ordered beginner → intermediate.)*

## Cooking badges ✅
🍳 Junior Chef · 🥭 Dessert Explorer · 🍮 Sweet Treat Specialist · 🍢 Snack Maker ·
🍚 Rice Expert · 🍲 Soup Maker · 🍜 Noodle Master · 🥟 Lumpia Master · 🌟 Filipino
Food Explorer (5 recipes).

## Roadmap (next increments) 🔜
- **More recipes** — Mango Tapioca, Leche Flan, Maja Blanca, Polvoron, Meringue,
  Crinkles, Cookies, Cupcakes, Buchi, Puto Seko, Lumpia, Filipino Spaghetti,
  Macaroni Salad, Arroz Caldo, Utan (all just data).
- **Cooking Theater scene-mode** — the studio lesson as a no-scroll cinematic scene
  player (like Adventure Theater) with themed kitchens & cooking mascots (Coco & co.).
- **Little Chef Passport** — a second passport: chef stamps, cooking XP, chef levels
  (Beginner → Junior → Family Chef → Filipino Food Explorer).
- **Grandma's Recipe Box** — custom family recipes with stories, memories, photos,
  prayer (a vintage recipe-box keepsake, separate from the Cookbook).
- **Family Heritage Wall** — a growing wall of milestones & memories (first dessert,
  recipe of the month, Grandma's favorite…).
- **Photo upload** — real family photos on each Cookbook page (needs storage).

## Final-check alignment ✅
Teaches culture · language (naturally, not lists) · geography (real maps) · math ·
science · encourages Christian values (gratitude, sharing, prayer optional) · builds
family memories · follows the Constitution.
