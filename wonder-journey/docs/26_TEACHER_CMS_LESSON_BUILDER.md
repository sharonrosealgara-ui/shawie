# 🧰 Wonder Journey OS — Teacher CMS & Lesson Builder

- **Version:** 1.0 · **Status:** Production architecture (MVP core live) · **Priority:** Critical
- Governed by the [Constitution](../CONSTITUTION.md) · [Charter](CHARTER.md) · ADR-011 (two portals)

> Teachers build, schedule, manage, present, revise, and reuse lessons **without
> editing source code** — simple enough for an independent tutor, powerful enough
> for schools, churches, and learning centers. The CMS lives ONLY in the Teacher
> Portal; learners never see editing tools, answer keys, drafts, or admin controls.

---

## Live today ✅ (static MVP)
- **Teacher Dashboard strip** (top of Teacher Portal): today's/next lesson,
  quick actions (Create Lesson · Open Media Library · Client Summary), missing-media
  count, next birthday, progress at a glance.
- **Lesson Builder (form-based, no-code):** create/edit/delete **custom lessons** —
  title, emoji, theme (Theme Engine list), character value, story/teaching sections,
  quiz questions with correct answers, reflection prompts, XP. **Draft → Published**
  states; published lessons appear on the Adventure Map ("My Lessons"), open in the
  full cinematic Adventure Theater (theme, ambient sound, personalization scene,
  quiz, celebration, passport stamp) — identical experience to built-in adventures.
- **Curriculum Manager (data-level):** World→Unit→Adventure structure, dates,
  built flags (`curriculum-map.js`); reorder/duplicate via data.
- **Quiz building:** multiple-choice with correct-answer selection, XP, retry-safe
  gentle feedback (alternate question types 🔜 Quiz Engine).
- **Real-media integration:** Media Library search/preview + license/credit
  visibility + missing-media warnings (resilient placeholders; nothing unlicensed
  can render as "real").
- **Autosave-equivalent:** builder saves to state on Save; lesson work persists.

## SaaS-phase roadmap 🔜 (per this spec)
Visual drag-and-drop Scene Builder (20 scene types) · templates system · AI Lesson
Assistant (drafts only, teacher-approved, labeled — see [25_AI_AUTOMATION](25_AI_AUTOMATION.md)) ·
scheduling engine (recurrence, timezone; Shaun's Mon/Tue/Fri 4:30–5:30 PT stored as
client config) · publishing workflow with validation checklist (reading level,
accessibility, licenses, safety) · preview matrix (presenter/student, devices,
reduced motion, offline) · Live Teaching Mode (presenter view: timer, notes,
scene/quiz controls, participation, emergency skip) · version history/undo/redo ·
collaboration roles · reporting · parent-summary approval flow · full client
customization (branding, labels, curriculum, religious settings) without code.

## Rules
1. AI never publishes automatically; all generated content is editable, reviewed,
   and labeled.
2. Age differentiation (Explorer/Adventurer/Trailblazer + per-child extensions)
   comes from **client profile data**, never hardcoded names.
3. Religious configuration is client-specific (Feast-Day support for V1 family).
4. A lesson can never silently use unlicensed media.
5. Learner data stays protected; drafts stay private to the teacher.
