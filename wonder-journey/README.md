<div align="center">

# 🌏 Wonder Journey OS

### *Every Lesson is an Adventure. Every Adventure Becomes a Memory.*

A family learning adventure platform that turns online classes into immersive,
interactive, story-based experiences.

</div>

> **📜 Governed by [`CONSTITUTION.md`](CONSTITUTION.md)** — the project's highest
> authority. When any feature, UI, curriculum, content, or code decision conflicts
> with the Constitution, the Constitution wins.

> **Status legend** — `✅ Live now` works in today's build · `🔜 Planned` is on the roadmap.
> This README documents both the shipped MVP and the vision it's growing toward.

---

## 📖 Overview

**Wonder Journey OS** transforms weekly family classes into an adventure. Instead of a
plain lesson, each session is a guided journey — with story, geography, language,
cooking, science, character, and celebration woven together.

The first learning world is **🇵🇭 Discover the Philippines** — a complete, ready-to-teach
world of 10 adventures.

**Today it delivers `✅`:** Adventure Classroom · Fullscreen Presentation Mode ·
Quiz Engine · Reflection Journal · Travel Passport · Badges · Adventure Tree ·
Family Cookbook · configurable Family roster · Christian-friendly gratitude & prayer
(toggleable).

**Growing toward `🔜`:** Family Portal · Teacher Sharon Portal · Morning Blessings ·
Prayer Leader rotation · Family Storybook · Memory Timeline · Birthday Celebrations ·
Parent Summaries · Class-Prep Emails · AI Lesson Generation · Make.com Automation.

---

## ✨ Core Concept

Wonder Journey OS is **not a traditional LMS**. It's designed to feel like:

🎬 Canva Presentation Mode · 🏰 Disney storytelling · 🌍 National Geographic Kids ·
📔 a family scrapbook · 🏡 an interactive homeschool classroom · 🎭 adventure theater.

---

## 👨‍👩‍👧‍👦 User Roles

The platform has **two portals**:

### 1. Family Portal `🔜`
Used by the whole family — **Shaun, Taylor, Grandma, Rylee, Ezra, Asa, and Selah.**
They *experience* the adventure.

### 2. Teacher Sharon Portal `🔜`
Used by **Teacher Sharon** only. She *controls* the experience — launching lessons,
timing, and presenter notes.

> **The family sees the adventure. The teacher controls the experience.**
> *(In today's MVP there is one shared view with a Present button; the split Family/Teacher
> portals arrive with accounts in a later release.)*

---

## 🧩 Features

| Feature | Status |
|---------|--------|
| **Adventure Classroom** — open a lesson, teach through subject cards | `✅` |
| **Fullscreen Presentation Mode** — one-click, distraction-free | `✅` |
| **Quiz Engine** — auto-scored, instant feedback, XP reward | `✅` |
| **Reflection Journal** — family answers saved per adventure | `✅` |
| **Travel Passport** — a stamp for every adventure | `✅` |
| **Adventure Tree** — grows as the family learns | `✅` |
| **Badges** — 16 achievements to collect | `✅` |
| **Family Cookbook** — Filipino recipes to make together | `✅` |
| **Family roster & faith toggle** — configurable in Settings | `✅` |
| **Backup / Restore** — export & import progress (JSON) | `✅` |
| **Teacher Presenter View** — timer & notes, teacher-only | `🔜` |
| **Family Viewer Mode** — the clean fullscreen experience | `🔜` |
| **Morning Blessings** — daily gratitude entry | `🔜` |
| **Prayer Rotation** — whose turn to pray/lead today | `🔜` |
| **Cooking & Baking Studio** — guided recipe sessions | `🔜` |
| **Family Storybook** — auto-built memory book | `🔜` |
| **Birthday Celebrations** — pop-up on family birthdays | `🔜` |
| **Family Calendar & Memory Timeline** | `🔜` |
| **Resource Library** — printables & downloads | `🔜` |
| **Parent Summary** — weekly recap for parents | `🔜` |
| **Class-Prep Email** — auto lesson prep for the teacher | `🔜` |
| **AI Lesson Generator** (placeholder) | `🔜` |
| **Make.com Integration** (placeholder) | `🔜` |

---

## 🛠️ Tech Stack

**Today (MVP) `✅`** — a deliberately dependency-free static app for a zero-friction start:
- **HTML5 + modern CSS** (custom design system, light/dark themes)
- **Vanilla JavaScript** (no framework, no build step)
- **localStorage** for persistence (per device)

**Planned (SaaS) `🔜`** — for accounts, sync, and white-label:
- **Next.js** (App Router) · **React** · **TypeScript** · **Tailwind CSS**
- **Supabase** (database / auth / storage)
- **Make.com** (automation workflows)
- **Resend / Gmail API** (email) · **Cloudinary / Supabase Storage** (media)

> The current data layer is intentionally isolated so it can migrate from `localStorage`
> to Supabase **without rewriting the UI**.

---

## 📁 Project Structure

**Current MVP `✅`** — three files, no build:

```
wonder-journey/
├─ index.html        # app shell + design system (styles)
├─ curriculum.js     # all content: 10 adventures, badges, levels, cookbook
├─ app.js            # logic: routing, quiz, XP, progress, present mode
├─ README.md         # this file
├─ DEPLOYMENT.md     # deployment guide
└─ vercel.json       # static hosting config
```

**Planned modular structure `🔜`** (Next.js SaaS):

```
app/            # routes (family, teacher, classroom, cookbook…)
components/     # reusable UI
features/       # feature modules (passport, quiz, storybook…)
modules/        # portal logic (family, teacher)
config/         # family, branding, schedule, mascots
data/           # curriculum content (worlds & adventures)
hooks/  lib/  types/  styles/  assets/  docs/
```

The system is **modular, configurable, and white-label ready** — content and branding
live in config/data, separate from the app logic.

---

## 🚀 Getting Started

### Run the MVP today `✅` — no install needed
Open **`index.html`** in any browser (double-click it), or serve the folder:

```bash
npx serve wonder-journey     # optional local static server
```

Progress saves automatically in your browser.

### Planned Next.js workflow `🔜`

```bash
npm install     # install dependencies
npm run dev      # start dev server → http://localhost:3000
npm run lint     # check code
npm run build    # production build
```

---

## 🔐 Environment Variables

The **MVP requires none** — it runs with no secrets. `✅`

Future variables (store in the host's env settings, never commit real values): `🔜`

```bash
NEXT_PUBLIC_APP_URL
SUPABASE_URL
SUPABASE_ANON_KEY
RESEND_API_KEY
MAKE_WEBHOOK_URL
OPENAI_API_KEY
ANTHROPIC_API_KEY
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full list and rules.

---

## 🎨 Customization

Wonder Journey OS is built to be personalized — today via **Settings** `✅`, and via
config files in the SaaS build `🔜`:

| You can customize | Where (today) |
|-------------------|---------------|
| Family name & members, roles, avatars | Settings → Family Members `✅` |
| Faith content on/off | Settings → Faith toggle `✅` |
| Light / dark theme | 🌙 top bar `✅` |
| Lessons, recipes, colors, branding, mascots, birthdays, schedule | `config/` & `data/` files `🔜` |

---

## 🇵🇭 First Learning World — Discover the Philippines `✅`

Ten complete adventures weave together:

🗣️ **Tagalog** · 🗣️ **Hiligaynon** · ❤️ **Filipino family values** ·
🌍 **Geography** (Luzon, Visayas, Mindanao) · 🍳 **Cooking & baking** ·
🌿 **Nature & animals** · 🌋 **Volcanoes & science** · 🎉 **Festivals** ·
📖 **English** · ➕ **Basic math & study skills** ·
🙏 **Christian-friendly gratitude & prayer** (fully optional via the faith toggle).

---

## 🎥 Live Class Experience

1. **Teacher Sharon launches** the adventure. `🔜 portal` / `✅ open + Present today`
2. **The family joins** and sees a fullscreen adventure presentation. `✅`
3. **The teacher gets presenter controls** — notes & a timer (teacher-only). `🔜`
4. Each lesson flows through **subject cards → quiz → reflection → family challenge →
   Adventure Complete celebration** (XP, stamp, badges). `✅`

---

## 🌐 Deployment

Supported: **GitHub → Vercel / Netlify → Custom domain (HTTPS)**, with **PWA** planned.
Full step-by-step (including static configs and domain setup) is in
**[DEPLOYMENT.md](./DEPLOYMENT.md)**. `✅`

---

## 📚 Documentation

| Doc | Status |
|-----|--------|
| `README.md` — this file | `✅` |
| `DEPLOYMENT.md` — hosting, domain, env, backups | `✅` |
| `PROJECT_CHARTER.md` · `ARCHITECTURE.md` · `DESIGN_SYSTEM.md` · `ROADMAP.md` | `🔜` |
| `AI_BEHAVIOR.md` · `CONTENT_GUIDELINES.md` · `CURRICULUM_FRAMEWORK.md` | `🔜` |
| `DECISIONS.md` · `DATABASE.md` · `API_PLAN.md` · `TESTING.md` | `🔜` |

*(Docs marked `🔜` are planned — I can generate any of them on request.)*

---

## 📌 Project Status

- **Stage:** MVP in progress — World 1 (10 adventures) live and playable.
- **First client:** **Shaun & Taylor's family.**
- **First use case:** Weekly family learning classes.

---

## 🔭 Long-Term Vision

Wonder Journey OS will grow to support:

- Multiple teachers & multiple families
- White-label branding & custom domains per client
- AI lesson generation
- A curriculum marketplace
- Family memory books & automated emails
- Commercial SaaS plans

---

<div align="center">

**Wonder Journey OS exists to make learning joyful, personal, memorable, and family-centered.**

### *Every lesson is an adventure. Every adventure becomes a memory.* 🌏

*A Digital Solutions Studio project · Built with ❤️ for the Ferrell Family.*

</div>
