# 📈 Wonder Journey OS — Analytics, Progress & Reporting Engine

- **Version:** 1.0 · **Status:** Production architecture (MVP core live; engine = SaaS phase) · **Priority:** Critical
- Governed by the [Constitution](../CONSTITUTION.md) · builds on docs 20/21 (portals), 25 (AI), 26 (CMS), 27–28 (identity/tenancy)

> Analytics exist to **encourage, reflect, and improve teaching** — never to rank,
> pressure, or compare children. The system tells the story of learning through
> adventures completed, skills practiced, words learned, recipes cooked, places
> explored, and memories made. **Never reduce a learner to one score.**

## Hard rules
No public leaderboards · no sibling comparisons · no shame-based warnings or
labels ("behind", "failing") — progress states use encouraging language (Not
Started → Introduced → Practicing → Growing → Confident → Completed · Needs
Review · Extension Completed). No invasive surveillance (no mouse/camera/private
browsing tracking) — only events with educational purpose. Teacher Portal gets
detailed insight; the learner portal stays simple, positive, and visual (passport
journeys, tree growth, maps, badges — never corporate charts). Every query is
organization-scoped; permissions enforced server-side.

## Live today ✅ (MVP)
- **Learner progress record:** completions (score + date), XP/levels, badges,
  passport stamps, reflections, blessings, cookbook keepsakes, custom-lesson
  completion — all feeding child-friendly views: Passport, Badges, Adventure
  Tree, Memory Timeline, progress ring.
- **Celebration triggers:** first adventure, milestones (1/3/7/12/24/36/72),
  badge unlocks, recipe completions, certificates — configurable thresholds in
  data (`MILESTONES`).
- **Teacher views:** dashboard strip (taught count, missing media, birthdays,
  today's lesson) · Client Summary (progress at a glance, upcoming prep,
  **copy-ready after-class recap** — the report the parent actually reads).
- **Quiz data:** per-adventure score/total retained; retries improve scores;
  gentle feedback (never harsh).
- **Family togetherness:** shared XP/tree/timeline — progress is the family's,
  by design.

## SaaS-phase engine 🔜
- **Data model:** `analytics_events, attendance_records, progress_records,
  skill_progress, lesson_completions, activity_attempts, quiz_attempts,
  question_results, reflections, badge_awards, passport_stamps, certificates,
  cooking_progress, vocabulary_progress, media_engagement, reports,
  report_templates, scheduled_reports, learning_insights, celebration_triggers`
  — every row carries `organization_id`, learner id, timestamps, source, version.
- **Skill tracking** across Language (EN/Tagalog/Hiligaynon; speaking/listening/
  reading/writing), Math, Science, Geography, Culture, Life Skills, Christian
  Character — with the encouraging progress states above.
- **Attendance:** present/absent/late/excused/rescheduled/make-up + private
  teacher note, recurring schedules, timezone-safe, calendar view.
- **Report templates:** lesson completion · weekly/monthly summaries · learner &
  family reports · attendance · quiz · vocabulary · math · Cooking Academy ·
  Bible/character · passport · certificates · media usage · org summary — teacher
  reviews **and approves** every outgoing parent/client report; exports as PDF/
  CSV/print/email/private link, permission-checked.
- **AI-drafted insights** (doc 25 rules): observable-activity-based, editable,
  clearly labeled, never diagnostic, never auto-published.
- **Media analytics:** views, video completion, captions/transcripts used,
  broken/missing media, fallback usage → feeds lesson-quality improvements.
- **Quality/perf:** dedup + validation (no double badges/certificates, no
  impossible scores, org-id required), precomputed aggregates, background report
  jobs, paginated/accessible charts (never color-alone meaning).

## Quality gate (before the engine ships)
Accurate · encouraging language · privacy protected · tenant-isolated ·
understandable charts · no learner comparisons · teacher approval works ·
learner view stays simple · exports respect permissions · AI insights labeled ·
accessible.
