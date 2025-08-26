#!/usr/bin/env bash
set -euo pipefail

echo "[local] Ensuring pnpm 10.15.0 via corepack..."
corepack enable >/dev/null 2>&1 || true
corepack prepare pnpm@10.15.0 --activate >/dev/null 2>&1 || true

echo "[local] Installing filtered workspace deps..."
pnpm install --filter @poody/config --filter @poody/ui --filter @poody/games --filter @poody/web --frozen-lockfile=false

echo "[local] Starting Remix dev in mock mode..."
cd apps/web
cp -n .env.example .env || true
USE_MOCKS=true pnpm dev

