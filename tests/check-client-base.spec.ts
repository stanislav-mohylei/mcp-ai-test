import { test, expect } from '@playwright/test';

test.describe('Check client base', () => {
  test('navigate EPAM client work', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Click "Services" via JS to avoid overlay issues
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const services = links.find(a => /\bServices\b/i.test(a.textContent || '') || (a.href && a.href.includes('/services')));
      if (services) services.click();
    });

    await page.waitForSelector('text=Explore Our Client Work', { timeout: 20000 });

    // Click the "Explore Our Client Work" link via JS to avoid slider overlay
    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      const target = links.find(a => /Explore Our Client Work/i.test(a.textContent || '') || (a.href && a.href.includes('/services/client-work')));
      if (target) target.click();
    });

    await page.waitForSelector('text=Client Work', { timeout: 20000 });
    await expect(page.locator('text=Client Work')).toBeVisible();
  });
});
