# 📋 Wonder Journey OS — Product Requirements Document (PRD)

- **Version:** 1.0 · **Status:** Active · Governed by the [Constitution](../CONSTITUTION.md) & [Charter](CHARTER.md)

## Product
A premium interactive **educational operating system**: cinematic lessons, real
educational media, family gamification (passport/badges/tree), Cooking Academy,
celebrations & keepsakes, and grown-up planning tools — sellable to families,
tutors, homeschool groups, churches, schools, and learning centers.

## Users & portals
**Teacher** (admin; plans, presents, reviews) · **Client/Student** (learns, plays,
remembers). Two portals only (ADR-011).

## V1 scope (the Ferrell family) — status
| Requirement | Status |
|---|---|
| 72-lesson World 1 curriculum (map + metadata) | ✅ (29 fully interactive; authoring continues unit by unit) |
| Cinematic Adventure Theater + Theme/Scene engines | ✅ |
| Real Educational Media system + licensing pipeline | ✅ (asset download runs outside sandbox) |
| Personalization per child · age tiers | ✅ |
| Passport · Badges · Tree · Storybook · Celebrations · Certificates | ✅ |
| Cooking Academy + keepsake Cookbook | ✅ core (5 recipes; more = data) |
| Teacher Portal (plans · client summary · media library) | ✅ |
| Sound Director + adaptive ambient | ✅ |
| Faith content toggle · Feast-Day-respectful holidays | ✅ |
| Deployment (Netlify static) + live preview artifact | ✅ config ready |

## V2+ (SaaS) — priorities
1. Full curriculum authored (Units 5–13) + real media files committed.
2. Supabase auth/RBAC + per-client isolation ([23_AUTH_SECURITY](23_AUTH_SECURITY.md)).
3. Uploads (photos/videos) → Memory Gallery, cookbook photos, Grandma's Recipe Box.
4. Live Class Mode (presenter view ↔ client view).
5. AI & Automation Engine ([25_AI_AUTOMATION](25_AI_AUTOMATION.md)) + Make.com.
6. Little Chef Passport · Heritage Wall · six-mascot cast · quiz types.
7. White-label multi-client (Worlds marketplace, branding, domains).

## Success criteria
The family asks for another adventure tomorrow (Constitution's Final Question) ·
zero console errors · every lesson runs with media missing · a second client can be
onboarded via configuration only.

## Non-goals (V1)
Ads · social feeds · public sharing of children's data · AI-generated imagery for
factual content.
