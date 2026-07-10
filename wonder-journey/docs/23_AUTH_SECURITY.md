# 🔐 Wonder Journey OS — Authentication & Security

- **Version:** 1.0 · **Status:** Specification (SaaS phase) · MVP posture below

> Privacy by design — this platform serves children. Security decisions always err
> toward protecting the family.

## MVP posture (today's static app) ✅
- **No accounts, no server, no data leaves the device** — all state in
  `localStorage`; the strongest privacy posture possible for V1.
- Teacher tools gated by Teacher Mode/portal grouping (soft gating on a family
  device; real auth arrives with SaaS).
- No third-party trackers, no external requests (CSP-friendly), no uploads yet.

## SaaS-phase requirements 🔜
- **Authentication:** Supabase Auth (email/OAuth); children never need their own
  credentials — client accounts are owned by the responsible adult.
- **Authorization / RBAC:** roles = `teacher` (admin) · `client` (learner/guardian);
  every API/table enforced with row-level security; per-client data isolation
  (family A can never read family B).
- **Uploads:** validation (type/size), malware scanning, signed URLs, private
  buckets, per-client folders; identifiable-child media never public.
- **Data protection:** encryption in transit (TLS) and at rest; minimal PII
  (names, optional birthdays, progress); export & delete-my-data supported;
  COPPA-mindful design (no ads, no behavioral tracking, guardian consent).
- **Operational:** audit logging of admin actions · rate limiting · secret
  management via env vars ([Deployment Guide](13_DEPLOYMENT_GUIDE.md)) · backups
  with tested restore · dependency updates.

## Rules that never change
1. Children's data is never sold, mined, or shared.
2. Least privilege everywhere; teacher tools invisible to learners.
3. Client-uploaded family media stays private to that client.
4. Every security-relevant change gets an ADR.
