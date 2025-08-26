import { test, expect } from '@playwright/test';
import { analyze } from '@axe-core/playwright';

test('home has no obvious a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await analyze(page, { rules: { 'color-contrast': { enabled: true } } });
  expect(results.violations).toEqual([]);
});

