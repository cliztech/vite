# Local Development Options

This repo includes multiple ways to run the site locally without changing your host environment.

## Option A — VS Code Dev Container (recommended)
- Requirements: VS Code + "Dev Containers" extension or GitHub Codespaces.
- Steps:
  1) Open the repo in VS Code.
  2) Reopen in Container (or start a Codespace).
  3) Post-create runs install + MSW init automatically.
  4) Start: `cd apps/web && pnpm dev:local` (or simply `pnpm dev:local` if already in apps/web).
  5) Open: http://localhost:3000

### GitHub Codespaces Prebuilds (faster start)
- Enable in GitHub: Settings → Codespaces → Prebuilds → New configuration.
- Choose main branch and regions; it will cache the devcontainer + postCreate.
- After prebuild completes, creating a Codespace starts instantly; run `pnpm dev:local`.

## Option B — Docker Compose (no VS Code needed)
- Requirements: Docker Desktop / Docker Engine.
- Steps:
  - `docker compose up` (first run may take a few minutes)
  - Open: http://localhost:3000

## Option C — Host machine (Node + pnpm)
- Node 20+, pnpm 10.15:
  - `corepack enable && corepack prepare pnpm@10.15.0 --activate`
- Install only Poody packages:
  - `pnpm install --filter @poody/config --filter @poody/ui --filter @poody/games --filter @poody/web`
- Start with mocks (no creds required):
  - `cd apps/web && cp .env.example .env && pnpm dev:local`

## Notes
- Mocks: `USE_MOCKS=true` serves mock Storefront data; no Shopify credentials required.
- Port: 3000 (dev + preview).
- One-time: `npx msw init apps/web/public` (Dev Container does this automatically).
