# AI Life OS

**My Personal Finance, Productivity & Automation Dashboard**

A premium, production-ready personal operating system covering finances, productivity, career, businesses, and AI automations — built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with a custom design system (light/dark themes, OKLCH color tokens)
- **shadcn/ui**-style component primitives (Radix UI + `class-variance-authority`)
- **Framer Motion**–ready animation classes (`tw-animate-css`)
- **Recharts** for all charts, following a colorblind-safe, validated categorical palette
- **Zustand** (with `persist` middleware) for state management and localStorage persistence
- **React Hook Form + Zod** for form validation
- **TanStack Query** installed and ready for future async/remote data fetching
- **xlsx / jsPDF** for Excel and PDF report exports

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Project Structure

```
src/
  app/                     # Next.js App Router pages (one folder per route)
  components/
    ui/                    # shadcn/ui-style primitives (button, card, dialog, ...)
    layout/                # Sidebar, topbar, page header, app shell
    charts/                # Recharts wrappers (tooltip, chart card)
    dashboard/, budget/, savings/, bills/, expenses/,
    projects/, businesses/ # Feature-specific components
  store/                   # Zustand stores (one per domain), persisted to localStorage
  lib/
    ai/                    # Rule-based AI assistant + pluggable service interface
    seed-data.ts           # Initial demo data (exact ₱25,000 budget breakdown)
    derived.ts             # Financial calculations (health score, projections, etc.)
    export.ts              # CSV / Excel / PDF export helpers
    backup.ts              # Full JSON backup/restore across all stores
  types/                   # Shared TypeScript domain types
```

## Data Layer & Future Backend Migration

All application data is persisted to `localStorage` via Zustand's `persist` middleware, namespaced under `ai-life-os:*` keys (one key per domain: budget, expenses, savings, bills, career, projects, businesses, social, automations, learning, settings).

Every store exposes plain CRUD actions (`add*`, `update*`, `remove*`) that operate on serializable data — there is no direct localStorage access inside components. To migrate to **Supabase, Firebase, PostgreSQL, or MongoDB**, replace each store's `persist` storage engine (or the actions themselves) with calls to your backend/API; because components only ever call store actions and never touch storage directly, this is a contained change.

Use **Settings → Backup & Restore** to export/import all data as a single JSON file at any time.

## AI Assistant

The AI Assistant (`/ai-assistant`) is powered by a local, rule-based insights engine (`src/lib/ai/rule-based-assistant.ts`) that answers questions like:

- "Can I afford ₱1,500?"
- "How much should I save this month?"
- "Am I overspending on Wants?"
- "How long until I reach my house savings goal?"
- "What is my Financial Health Score and why?"

It's built behind an `AIAssistantService` interface (`src/lib/ai/types.ts`) with a factory (`src/lib/ai/service.ts`), so swapping in a real LLM (Claude, OpenAI, Gemini) later only requires implementing that interface and updating the factory — no UI changes needed.

## Design System

Colors, chart palettes, and status colors follow a colorblind-safe, contrast-validated system (see `src/app/globals.css`). Both light and dark themes are fully supported and toggleable from the top bar or Settings.

## Notes

- All monetary values default to Philippine Peso (₱) formatting and are configurable in Settings.
- The Monthly Budget seed data totals exactly ₱25,000 across Fixed Expenses, Savings, and Lifestyle groups.
- Receipt upload and third-party automation integrations (Gmail, Facebook, Google Calendar, etc.) are wired up as UI placeholders ready for real API keys/backends.
