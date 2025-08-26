# Poody Toons — Delivery Plan

Milestones focus on a production-grade Hydrogen storefront plus interactive kids features with tight quality gates.

## M0 — Monorepo Bootstrap (Week 0–1)
- Monorepo skeleton: `apps/web`, `packages/{ui,games,config,assets}`, `tools`, `.github`, `docs`.
- TypeScript strict across all packages; shared `tsconfig` and ESLint via `@poody/config`.
- TailwindCSS config, tokens, and shadcn/ui-compatible primitives foundation.
- CI: install, typecheck, lint, unit build; basic Lighthouse CI and Axe scans.
- Owner checkpoint: repo tree, CI passing, ASCII previews, decisions list.

## M1 — App Shell + Core Features (Week 1–2)
- Hydrogen app shell with Remix routes: `/`, `/shop`, `/product/$handle`, `/cart`, `/games`, `/toons`, `/about`, `/privacy`, `/terms`.
- UI kit (Button, Card, Dialog, Tabs) wired with Tailwind tokens and accessibility.
- Games package: “Color‑n‑Save” MVP (paint/undo/redo/export, autosave). Runner game stub (lazy-load).
- Shopify Storefront integration stubbed with MSW/mock data; swap to env creds later.
- Baseline Lighthouse ≥ 90/90/100/100 target plan; Axe passes; Core Web Vitals guardrails.
- Owner checkpoint: route screenshots, performance/a11y report, next decisions.

## Operating Principles
- Ask-only-if-blocked; small loops; production-first quality.
- COPPA-friendly patterns, WCAG 2.2 AA, no dark patterns.
- Measurable outcomes per sprint: demos, diffs, tests, vitals, a11y.

## Initial DAG (high-level)
1) Config + tooling → 2) UI tokens → 3) App shell → 4) Games MVP → 5) Shopify mocks → 6) QA (tests, Axe, LHCI) → 7) Content pages → 8) Release v0.1.

## Checkpoint Questions (Default Decisions if No Response)
- Brand palette: default bright playful palette with high contrast; rounded corners (2xl).
- Motion level: subtle micro-interactions, reduced-motion variants enabled.
- Games engine: PixiJS for sprite-heavy, Phaser optional later; start with lightweight canvas for painter.

