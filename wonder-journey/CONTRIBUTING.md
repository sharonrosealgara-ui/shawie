# 🤝 Contributing to Wonder Journey OS

Wonder Journey OS is Sharon's flagship educational product. Every contribution must
protect the **product vision, architecture, design quality, and family learning
experience**. This guide keeps contributions safe, consistent, and on-mission.

> **📜 Read [`CONSTITUTION.md`](CONSTITUTION.md) first.** It is the project's highest
> authority. If anything in this guide — or any feature, design, or content decision —
> ever conflicts with the Constitution, **the Constitution wins.** Before approving any
> lesson, run it through the Constitution's *Final Question.*

> **Note on stack:** Today's MVP is a **dependency-free vanilla-JS static app**
> (`index.html` + `curriculum.js` + `app.js`). The **TypeScript / React / Next.js**
> standards below are the **target for the SaaS migration** — they apply as we move
> there. The vision, design, role-separation, content, faith, accessibility, and
> "configuration-first" rules apply **right now, to every change.** Rules marked
> `🔜` describe features not yet built.

---

## 🎯 Core Contribution Principle

Every contribution must support **at least one** of these goals:

- Make learning more **joyful**
- Make the platform easier for **families**
- Make teaching easier for **Sharon**
- Improve **accessibility**, **performance**, **maintainability**, or **reusability**
- Improve **white-label readiness**
- **Preserve family memories**
- Strengthen the **Adventure Classroom** experience

> If a change doesn't serve one of these, **don't add it.** *(See the Final Principle.)*

---

## 📚 Before Contributing

Read the docs that exist today: **[README.md](./README.md)** and
**[DEPLOYMENT.md](./DEPLOYMENT.md)**.

These are planned and should be read once they exist `🔜`:
`PROJECT_CHARTER.md` · `ARCHITECTURE.md` · `DESIGN_SYSTEM.md` · `ROADMAP.md` ·
`AI_BEHAVIOR.md` · `CONTENT_GUIDELINES.md` · `CURRICULUM_FRAMEWORK.md` ·
`DECISIONS.md` · `DATABASE.md` · `API_PLAN.md` · `TESTING.md`.

**Do not make major changes without reviewing the relevant documentation.**

---

## 🔁 Development Workflow

1. Review the docs · 2. Understand the request · 3. Inspect existing code ·
4. Identify affected files · 5. Plan the change · 6. **Explain the plan** ·
7. Implement carefully · 8. **Test** · 9. Run build/validation checks ·
10. Update docs if needed · 11. **Summarize what changed.**

---

## 🌿 Branching

Use clear, prefixed branch names:

```
feature/adventure-classroom     fix/family-view-controls
feature/family-cookbook         fix/mobile-layout
feature/birthday-system         docs/update-roadmap
feature/class-prep-email        refactor/lesson-engine
```

Don't work directly on production/`main` unless necessary.

## 📝 Commit Message Style

Use conventional prefixes:

```
feat: add Adventure Classroom presenter mode
fix: hide teacher timer from Family Portal
docs: update deployment guide
refactor: move lesson data into config
style: refine watercolor card design
test: add quiz testing checklist
```

---

## 🧱 Code Standards

**Target (SaaS) `🔜`:** TypeScript · React · Next.js App Router · Tailwind CSS ·
reusable components · configuration files · clean imports · meaningful names.

**Today (MVP) `✅`:** clean vanilla JS/CSS, small focused functions, content in
`curriculum.js`, logic in `app.js`, one design system in `index.html`.

**Avoid (always):** duplicate code · hardcoded family/lesson data · giant unorganized
components · unnecessary dependencies · poor accessibility · broken routes · messy CSS ·
inline styles unless justified.

---

## ⚙️ Configuration-First Rule (applies now)

**Never hardcode** family names · student names · teacher names · birthdays · lessons ·
recipes · badges · schedules · colors · mascots · resources · destinations.

Put them in **config/data** (today: `curriculum.js` for content, the `family`/settings
state for people & preferences). **Wonder Journey must stay reusable for future families
and white-label clients.**

---

## 🎨 UI Contribution Rules

Every UI change must feel: **watercolor · tropical · soft · warm · child-friendly ·
family-centered · storybook-like · Canva-inspired · premium — never corporate.**

- ❌ No generic dashboard/admin styling.
- ❌ The **Family Portal must never look like admin software.**
- ✅ Follow the existing design tokens (palette, rounded cards, soft shadows, Baloo/Nunito type).

---

## 👨‍👩‍👧‍👦 Role Separation Rule (critical)

Two portals: **Family Portal** and **Teacher Sharon Portal**.

**The Family view must NEVER show:** teacher timer · teacher notes · quiz answers ·
presenter controls · admin settings · AI generator · class-prep tools · technical UI.

**The Teacher view may show all tools.**

> **Family sees the adventure. Teacher controls the experience.**
> *(Today this is enforced by the **Teacher Mode** toggle — teacher extras appear only
> when it's on. Keep it that way: any teacher-only UI must be gated behind Teacher Mode /
> the Teacher Portal.)*

---

## 🎭 Adventure Classroom Rules

The Adventure Classroom is the **heart of the product**. Any change must preserve:
fullscreen presentation mode · teacher presenter view · family viewer mode ·
a **quiz after every lesson** · reflection · family challenge · memory capture ·
the Adventure Complete screen. **Do not weaken it.**

---

## 📖 Lesson Content Rules

Every lesson should include: story intro · maps (for geography) ·
**Tagalog or Hiligaynon** when relevant · **English/Math** integration when relevant ·
an interactive activity · a **quiz** · reflection · a **family challenge** ·
a **badge or passport stamp** · parent-summary material `🔜`.

Keep lessons **engaging, age-appropriate, and family-friendly.**

### 🗺️ Map Rule
Never teach geography with text only. A destination lesson should orient the family:
**World → Asia → Philippines → Luzon/Visayas/Mindanao → Province → City/destination.**

### ❓ Quiz Rule
Every lesson has a quiz. It may be multiple-choice, true/false, matching, picture ID,
map quiz, vocabulary match, discussion question, or a practical challenge.
**Encouraging, never stressful.**

---

## 🙏 Faith & Family Values Rule

Christian-friendly features stay **respectful and optional**:
- Morning Blessings gratitude may be framed as *"What are you grateful to the Lord for today?"* — and remains gentle for all.
- Prayer Leader is **optional**.
- Never force participation. The **faith toggle** must hide all faith content cleanly.
- Respect the family's stated beliefs and preferences.

---

## 🎂 Birthday & Celebration Rule `🔜`

Celebrations should support **Teacher Sharon, Shaun, Taylor, Grandma, Rylee, Ezra, Asa,
and Selah.** Birthdays must be **configurable** (in the family editor), and pop-ups
should feel **joyful, warm, and family-centered.**

---

## ♿ Accessibility (not optional)

Consider on every change: keyboard navigation · large clickable buttons · readable fonts ·
sufficient contrast · alt text · `prefers-reduced-motion` · captions where possible ·
mobile usability.

## ⚡ Performance

**Avoid:** oversized assets · unoptimized images · heavy unoptimized animations ·
unnecessary re-renders · blocking scripts.
**Use:** lazy loading · image optimization · reusable assets · efficient state.

## 🔗 External Resource Rule

Never let a lesson fail because a link is blocked. Every external video/resource needs a
**title, description, source, fallback activity, teacher note, and offline alternative.**

---

## ✅ Testing Requirements

**SaaS `🔜`:** `npm run lint` && `npm run build` must pass.
**MVP `✅`:** validate `curriculum.js` structure + `app.js` syntax, then **drive it in a
real browser** (this repo's checks do exactly this before each push).

Manually test: Family view · Teacher Mode · Adventure Classroom · fullscreen ·
quiz · reflection · storybook · cookbook · Morning Blessings · birthday pop-up `🔜` ·
parent summary `🔜` · **mobile layout**.

---

## 🧾 Pull Request Checklist

- [ ] Build / validation passes · [ ] No console errors · [ ] No broken routes
- [ ] UI matches the design system · [ ] **Family view stays simple**
- [ ] **Teacher tools hidden from the family** · [ ] Feature is **configurable**
- [ ] Accessibility checked · [ ] Performance checked
- [ ] Documentation updated · [ ] Testing completed

Update docs when you change: architecture · folder structure · feature behavior ·
design system · curriculum rules · API plans · deployment · data models.

---

## 🤖 AI Contributor Rules (Claude Code)

Claude Code must: **inspect before editing** · preserve working code ·
**explain the plan before major changes** · avoid unnecessary rewrites ·
keep architecture modular · keep white-label readiness · follow all docs ·
**test before finishing** · **summarize changes clearly.**

---

## 🌟 Final Contribution Principle

> **Do not add features just because they are possible.**
> Add a feature only when it makes Wonder Journey more **joyful, useful, memorable,
> accessible, reusable, or professional.**

---
*A Digital Solutions Studio project · Built with ❤️ for the Ferrell Family.*
