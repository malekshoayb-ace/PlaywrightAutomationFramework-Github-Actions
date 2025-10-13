import { test, expect } from '../fixtures/customFixtures.js';

test.describe('Playwright Documentation Search', () => {
  test('should navigate to home page', async ({ homePage }) => {
    await homePage.navigateToHome();
    await expect(homePage.page).toHaveTitle(/Playwright/);
    expect(await homePage.isHomePageLoaded()).toBe(true);
  });

  test('should perform basic search', async ({ homePage, searchPage, testData }) => {
    await homePage.navigateToHome();
    await homePage.clickGetStarted();
    await searchPage.search(testData.searchTerms.javascript);
    
    // Just verify search results appear
    const hasResults = await searchPage.areSearchResultsVisible();
    expect(hasResults).toBe(true);
  });
});
