import { test, expect } from '@playwright/test';

test('home loads and shows brand', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Poody Toons' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome to Poody Toons!' })).toBeVisible();
});

test('games page renders coloring canvas', async ({ page }) => {
  await page.goto('/games');
  await expect(page.getByRole('tab', { name: 'Color‑n‑Save' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Coloring canvas' })).toBeVisible();
});

