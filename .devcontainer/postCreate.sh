#!/usr/bin/env bash
set -euo pipefail

echo "[devcontainer] Installing filtered workspace deps with pnpm..."
pnpm -v || (corepack enable && corepack prepare pnpm@10.15.0 --activate)

# Install only our new packages to avoid full upstream Vite install cost
pnpm install --filter @poody/config --filter @poody/ui --filter @poody/games --filter @poody/web --frozen-lockfile=false

echo "[devcontainer] One-time MSW init (safe to ignore if already present)..."
cd apps/web
npx msw init public || true
cp -n .env.example .env || true

echo "[devcontainer] Ready. Start dev with: pnpm dev:local"

