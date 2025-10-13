import { test, expect } from '../fixtures/customFixtures.js';

test.describe('Cross-Browser Compatibility Tests', () => {
  test('should work across all browsers', async ({ homePage, searchPage, testData, page }) => {
    // This test will run on all configured browsers (Chromium, Firefox, WebKit, Edge)
    
    // Navigate to home page
    await homePage.navigateToHome();
    
    // Verify page loads correctly
    await expect(page).toHaveTitle(/Playwright/);
    
    // Test basic functionality
    await homePage.clickGetStarted();
    
    // Test search functionality
    await searchPage.search(testData.searchTerms.javascript);
    
    // Verify search results
    const hasResults = await searchPage.areSearchResultsVisible();
    expect(hasResults).toBe(true);
    
    // Take screenshot for visual comparison across browsers
    await page.screenshot({ 
      path: `reports/screenshots/cross-browser-${test.info().project.name}.png`,
      fullPage: true 
    });
  });

  test('should handle responsive design', async ({ page, homePage }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.navigateToHome();
    
    // Verify mobile layout
    await expect(page).toHaveTitle(/Playwright/);
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Verify tablet layout
    await expect(page).toHaveTitle(/Playwright/);
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    
    // Verify desktop layout
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should test browser-specific features', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');
    
    // Browser-specific tests
    if (browserName === 'chromium') {
      // Test Chrome-specific features
      const userAgent = await page.evaluate(() => navigator.userAgent);
      expect(userAgent).toContain('Chrome');
    } else if (browserName === 'firefox') {
      // Test Firefox-specific features
      const userAgent = await page.evaluate(() => navigator.userAgent);
      expect(userAgent).toContain('Firefox');
    } else if (browserName === 'webkit') {
      // Test Safari-specific features
      const userAgent = await page.evaluate(() => navigator.userAgent);
      expect(userAgent).toContain('Safari');
    }
  });
});