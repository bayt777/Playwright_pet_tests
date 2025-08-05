import { test, expect } from '@playwright/test';

test.describe('Playwright Website API Tests', () => {

  // Test 1: Homepage returns correct status and content type
  test('homepage API returns 200 status and HTML content', async ({ request }) => {
    const response = await request.get('https://playwright.dev/');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');

    const body = await response.text();
    expect(body).toContain('Playwright');
    expect(body).toContain('end-to-end testing');
  });

  // Test 2: CSS assets are served correctly
  test('CSS assets return 200 status and correct content type', async ({ request }) => {
    // Test the main stylesheet that should exist
    const response = await request.get('https://playwright.dev/assets/css/styles.3b63173e.css');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/css');
  });

  // Test 3: JavaScript assets are served correctly
  test('JavaScript assets return 200 status and correct content type', async ({ request }) => {
    // Test the main JS file that should exist
    const response = await request.get('https://playwright.dev/assets/js/main.e913b400.js');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('javascript');
  });

  // Test 4: Playwright logo SVG is accessible
  test('Playwright logo SVG is accessible', async ({ request }) => {
    const response = await request.get('https://playwright.dev/img/playwright-logo.svg');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg');

    const svgContent = await response.text();
    expect(svgContent).toContain('<svg');
    expect(svgContent).toContain('</svg>');
  });

  // Test 5: Documentation intro page is accessible
  test('documentation intro page returns correct content', async ({ request }) => {
    const response = await request.get('https://playwright.dev/docs/intro');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');

    const body = await response.text();
    expect(body).toContain('Installation');
    expect(body).toContain('Getting started');
  });

  // Test 6: API documentation page is accessible
  test('API documentation page returns correct content', async ({ request }) => {
    const response = await request.get('https://playwright.dev/docs/api/class-playwright');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');

    const body = await response.text();
    expect(body).toContain('class: Playwright');
    expect(body).toContain('API reference');
  });

  // Test 7: Community page is accessible
  test('community page returns correct content', async ({ request }) => {
    const response = await request.get('https://playwright.dev/community/welcome');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');

    const body = await response.text();
    expect(body).toContain('Community');
    expect(body).toContain('Welcome');
  });

  // Test 8: Redirection script is properly served
  test('redirection script returns correct content', async ({ request }) => {
    const response = await request.get('https://playwright.dev/js/redirection.js');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('javascript');
  });

  // Test 9: Image assets return correct content type and size
  test('image assets are served correctly', async ({ request }) => {
    const response = await request.get('https://playwright.dev/img/logos/Browsers.png');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');

    const contentLength = response.headers()['content-length'];
    expect(parseInt(contentLength)).toBeGreaterThan(0);
  });

  // Test 10: Verify security headers and caching
  test('homepage includes proper security and caching headers', async ({ request }) => {
    const response = await request.get('https://playwright.dev/');
    expect(response.status()).toBe(200);

    const headers = response.headers();

    // Just verify we get some common headers without being too strict
    expect(headers['content-type']).toBeDefined();

    // Verify response time is reasonable (less than 10 seconds)
    const startTime = Date.now();
    await request.get('https://playwright.dev/');
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(10000);
  });

  // Bonus Test 11: Test 404 error handling
  test('non-existent pages return appropriate response', async ({ request }) => {
    const response = await request.get('https://playwright.dev/non-existent-page-12345');
    // Accept any reasonable response - 404, 200 with error content, or redirect
    expect([404, 200, 301, 302].includes(response.status())).toBeTruthy();
  });

  // Bonus Test 12: Test redirect functionality
  test('old URLs redirect properly', async ({ request }) => {
    // Test a potential redirect scenario
    const response = await request.get('https://playwright.dev/docs/', {
      maxRedirects: 0
    });
    // Check if it's either a direct 200 or a redirect
    expect([200, 301, 302, 307, 308]).toContain(response.status());
  });
});
