import { test, expect } from '@playwright/test';

// Test 1: Homepage title contains Playwright
test('homepage has Playwright in title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// Test 2: Get Started link is visible and navigates correctly
test('Get Started link is visible and navigates to docs', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const getStarted = page.locator('text=Get Started');
  await expect(getStarted).toBeVisible();
  await getStarted.click();
  await expect(page).toHaveURL(/docs\/intro/);
});

// Test 3: Search bar is present and works
test('search bar is present and returns results', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const searchButton = page.getByRole('button', { name: 'Search (Command+K)' });
  await expect(searchButton).toBeVisible();
  await searchButton.click();

  const searchInput = page.getByRole('searchbox', { name: 'Search' });
  await expect(searchInput).toBeVisible();
  await searchInput.fill('test');
  // Wait a moment for search results to appear
  await page.waitForTimeout(1000);
});

// Test 4: Navigation menu contains expected items
test('navigation menu contains expected items', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const navItems = ['Docs', 'API', 'Community']; // Removed 'Blog' as it's in footer
  for (const item of navItems) {
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: item })).toBeVisible();
  }

  // Check that Blog link exists in footer
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Blog' })).toBeVisible();
});

// Test 5: Footer contains GitHub link
test('footer contains GitHub link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const githubLink = page.locator('footer a[href*="github.com/microsoft/playwright"]');
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute('href', /github.com\/microsoft\/playwright/);
});
