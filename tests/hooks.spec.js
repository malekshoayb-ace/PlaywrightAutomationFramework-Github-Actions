import { test, expect } from '../fixtures/customFixtures.js';

test.describe('Test Hooks and Fixtures Demo', () => {
  test.beforeAll(async () => {
    console.log('🚀 Starting test suite execution');
  });

  test.beforeEach(async ({ page }) => {
    console.log(`📝 Starting test: ${test.info().title}`);
    // Setup logic before each test
  });

  test.afterEach(async ({ page }, testInfo) => {
    console.log(`✅ Completed test: ${testInfo.title} - Status: ${testInfo.status}`);
    
    // Take screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `reports/screenshots/failed-${testInfo.title}-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.attachments.push({
        name: 'screenshot',
        path: screenshotPath,
        contentType: 'image/png'
      });
    }
  });

  test.afterAll(async () => {
    console.log('🏁 Test suite execution completed');
  });

  test('should demonstrate custom fixtures usage', async ({ homePage, searchPage, testData, helpers }) => {
    // Using custom fixtures
    await homePage.navigateToHome();
    
    // Using helpers
    const currentDate = helpers.getCurrentDate();
    console.log(`Test executed on: ${currentDate}`);
    
    // Using test data
    await searchPage.search(testData.searchTerms.javascript);
    
    // Verify results
    const hasResults = await searchPage.areSearchResultsVisible();
    expect(hasResults).toBe(true);
  });

  test('should demonstrate authenticated user fixture', async ({ authenticatedPage }) => {
    // This test uses the authenticated page fixture
    // In a real scenario, this would be pre-authenticated
    await authenticatedPage.goto('https://playwright.dev');
    await expect(authenticatedPage).toHaveTitle(/Playwright/);
  });

  test('should demonstrate custom context fixture', async ({ customContext }) => {
    const page = await customContext.newPage();
    await page.goto('https://playwright.dev');
    
    // Test with custom context settings (geolocation, permissions, etc.)
    const viewport = page.viewportSize();
    expect(viewport.width).toBe(1920);
    expect(viewport.height).toBe(1080);
    
    await page.close();
  });
});