# 🤖 Wonder Journey OS — AI & Automation Engine

- **Version:** 1.0 · **Status:** Production architecture (automation core live; AI generation = SaaS phase)
- Governed by the [Constitution](../CONSTITUTION.md) · [Charter](CHARTER.md) · [Auth & Security](23_AUTH_SECURITY.md)

> **The AI never replaces the teacher — it is the teacher's intelligent
> assistant.** It reduces repetitive work and increases creativity,
> personalization, and family engagement, keeping the human relationship at the
> center.

## Principles
Helpful · transparent · safe · educational · family-friendly · **teacher-controlled**
· age-appropriate · explainable · privacy-conscious. AI features can be disabled;
AI-generated content is clearly identified; student data is never exposed or sent
without permission; AI **suggests** media but never violates copyright (the
licensing pipeline stays authoritative).

## Automation core (✅ live today — no AI required)
Auto-save progress · badge unlocking · passport stamps · XP/levels · storybook &
cookbook auto-entries · milestone celebrations · certificates · copy-ready lesson
plans & after-class summaries (the export format Make.com will consume) ·
birthday automation (roster-driven) · attendance implicit in completion dates.

## Rule-based "assistant" layer (✅ live)
Deterministic engines already personalize without an LLM: Personalization Engine
(per-child activities by theme), age tiers, theme/scene selection, materials &
ingredient kits, adaptive ambient sound. These remain the fallback when AI is off.

## AI Assistant (🔜 SaaS phase — architecture)
- **Provider-agnostic adapter:** one `AIProvider` interface (generate/summarize/
  translate) with pluggable backends — Anthropic (recommended: Claude), OpenAI,
  Gemini, or local models. Config-selected per client; no vendor lock-in.
- **Teacher AI (Teacher Portal only):** "generate today's introduction / an
  activity / a quiz / discussion questions / a Bible reflection / vocabulary or
  pronunciation practice / cooking tips"; "make it easier/harder/hands-on/explain
  for a seven-year-old." Output lands as **drafts the teacher approves** before
  learners ever see them, tagged "AI-assisted."
- **Generators:** lesson intros · activities · quizzes (MC, matching, picture,
  ordering, word games — difficulty auto-adjusted) · flashcards & vocab in
  EN/Tagalog/Hiligaynon · writing/reflection/prayer prompts (faith-toggle aware) ·
  storytelling (intros, dialogue, missions, endings) · cooking assistant (shopping
  lists, conversions, variations) · progress summaries & celebration messages.
- **Personalized learning:** adapts to age, interests, pace, strengths, and prior
  lessons using the **family profile already in state** (interests per child) —
  no additional personal data collected.
- **Accessibility:** text simplification, reading help, translation; speech
  synthesis/recognition future.

## External automation (🔜 Make.com / calendar / email)
Webhook-driven: weekly parent reports · lesson reminders · certificate emails ·
birthday greetings · calendar sync (lessons, cooking days, celebrations). Secrets
in env vars; retry + webhook security per [Deployment Guide](13_DEPLOYMENT_GUIDE.md).

## Client customization (🔜)
Per-client AI settings without code: teaching style, brand voice, language,
difficulty, AI on/off.

## Integration contract
The AI writes **through existing data models only** (adventure schema, quiz
schema, recipe schema, media ids) — so generated content automatically works in
the Theater, Theme/Scene engines, portals, and keepsakes.
