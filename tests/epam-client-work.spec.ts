import { test, expect } from '@playwright/test';

test.describe('EPAM client work flow', () => {
  test('navigate to client work via services', async ({ page }) => {
    // Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');

    // Accept cookie banner if present
    const acceptButton = page.getByRole('button', { name: /Accept All/i });
    if (await acceptButton.count() > 0) {
      await acceptButton.click();
    }

    // Click Services in the header
    await page.getByRole('link', { name: 'Services' }).nth(1).click();

    // Click "Explore Our Client Work"
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

    // Verify the "Client Work" heading is visible
    await expect(page.getByRole('heading', { name: 'Client Work' })).toBeVisible();
  });
});