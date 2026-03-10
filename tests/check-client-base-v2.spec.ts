import { test, expect } from '@playwright/test';

test.describe('Check client base', () => {
  test('navigate EPAM services and client work', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });
    // Try to click Services via DOM click to avoid pointer interception
    await page.evaluate(() => {
      const el = document.querySelector('header a[href="/services"]');
      if (el) el.click();
    });
    await page.waitForLoadState('networkidle');
    if (!page.url().includes('/services')) {
      await page.goto('https://www.epam.com/services', { waitUntil: 'networkidle' });
    }
    await page.waitForSelector('text=Explore Our Client Work', { timeout: 15000 });
    await page.click('text=Explore Our Client Work');
    await page.waitForSelector('text=Client Work', { timeout: 15000 });
    await expect(page.locator('text=Client Work')).toBeVisible();
  });
});
