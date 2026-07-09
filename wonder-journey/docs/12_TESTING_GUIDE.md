# ✅ Wonder Journey OS — Testing & QA Guide

- **Version:** 1.0 · **Status:** Active · **Priority:** High

> QA standards. Every feature, lesson, component, animation, and interaction must
> pass these before it's "complete." We're not only testing software — we're testing
> a **family learning experience.** If a feature technically works but creates
> confusion or frustration, it has **not** passed. Governed by the
> [Constitution](../CONSTITUTION.md).

---

## Testing levels
1. Functional · 2. UI/UX · 3. Educational · 4. Family Experience · 5. Accessibility ·
6. Performance · 7. Security · 8. Regression · 9. Deployment · 10. Acceptance.

## Functional
Every feature works: Family Portal, Teacher Portal, Parent Dashboard, Adventure
Theater, Map, Passport, Badges, Tree, Storybook, Cookbook, Celebrations,
Certificates, Quiz Engine, Reflection Journal, Media Library, Settings — all
buttons, forms, dialogs, and navigation behave as expected.

## UI/UX
Consistency · spacing · typography · colors · icons · illustrations · animations ·
responsiveness · ease of use · visual hierarchy · storybook feel. It must always
feel like Wonder Journey.

## Presentation mode (Adventure Theater)
Fullscreen · scene navigation · keyboard shortcuts · Family View · page transitions ·
animations · ambient audio · pointer. **No scrolling during lessons.** Teacher
controls hidden from Family View.

## Curriculum
Accuracy · learning objectives · age-appropriateness · story flow · activities ·
reflection · quiz quality · family interaction · Bible integration · language/math/
science/cooking integration · maps · real educational media.

## Family experience (every lesson → YES)
Would Rylee / Ezra / Asa / Selah enjoy this? Would Grandma join? Does it support
Shaun & Taylor's goals? Would the family want another Adventure tomorrow? If any NO —
improve it.

## Personalization
Every adventure includes a shared activity **plus** an optional activity for each of
Rylee, Ezra, Asa, Selah. No child left out.

## Quiz
Question clarity · correct answers · difficulty · game mechanics · scoring · XP ·
badge unlocking · feedback · retry flow · accessibility.

## Media (resilient)
Real photos/maps display; alt text present; captions correct; credits recorded;
**fallback placeholders work**; missing assets never break a lesson; **no hotlinks.**

## Animation / Audio
Animations: smooth · well-timed · consistent · performant · reduced-motion support;
enhance, never distract. Audio: ambient/music/UI sounds · mute · volume · captions ·
no unexpected playback.

## Accessibility
Keyboard nav · screen readers · alt text · color contrast · reduced motion · large
touch targets · readable fonts · focus states.

## Performance
Fast initial load · smooth scene transitions & animations · quick image/audio load ·
responsive quizzes · reasonable memory. Target: fast, smooth on modern desktop.

## Responsive & cross-browser
Desktop · laptop · tablet · large TV/Presentation · Family View. Chrome · Edge ·
Firefox · Safari — consistent behavior.

## Security *(SaaS phase)*
Auth · authorization · teacher-only vs family-only features · input validation ·
session handling · env vars · no sensitive data exposed.

## Regression
When a feature changes, retest related systems. E.g., changing Passport → retest
Badges, Adventure Tree, Progress, Celebrations, Certificates, Storybook. Never assume
a change affects only one feature.

---

## Current automated harness (MVP)
- **Syntax:** `node -e "require('vm').compileFunction(fs.readFileSync('app.js'),[],{})"` for each JS file.
- **Behavior + visual:** Playwright (headless Chromium) drives the combined app —
  renders every view, opens an adventure, exercises new surfaces, captures
  screenshots, and asserts **zero console/page errors** (ignoring expected
  `ERR_FILE_NOT_FOUND` for not-yet-uploaded media, which proves the fallback path).
- **Regression sweep:** iterate all sidebar views + open a built adventure after any
  change to shared code.

## Acceptance (a feature is "done" only if)
✓ Functional ✓ Beautiful ✓ Accessible ✓ Educational ✓ Family-friendly ✓ Documented
✓ Tested ✓ Approved.

## Bug report template
Title · Priority · Steps to reproduce · Expected · Actual · Screenshots ·
Environment/Browser · Status · Assigned · Resolved date.

## Release checklist
✓ Build succeeds ✓ No critical bugs ✓ Docs updated ✓ BUILD_STATUS updated ✓ CHANGELOG
updated ✓ Tests passed ✓ Responsive ✓ Accessibility ✓ Curriculum reviewed ✓ Media
verified ✓ Parent experience reviewed ✓ Teacher experience reviewed.

---

> **Final standard:** Wonder Journey is ready only when it feels effortless. Children
> should focus on the adventure, not the technology. If the software disappears and
> only the experience remains, the product has succeeded.
