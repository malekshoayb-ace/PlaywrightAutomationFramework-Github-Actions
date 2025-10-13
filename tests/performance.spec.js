import { test, expect } from '../fixtures/customFixtures.js';

test.describe('Performance Testing', () => {
  test('should measure page load performance', async ({ page, homePage }) => {
    // Start performance measurement
    const startTime = Date.now();
    
    // Navigate to home page
    await homePage.navigateToHome();
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Assert page loads within acceptable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should measure search performance', async ({ page, homePage, searchPage, testData }) => {
    await homePage.navigateToHome();
    await homePage.clickGetStarted();
    
    // Measure search performance
    const searchStartTime = Date.now();
    
    await searchPage.search(testData.searchTerms.javascript);
    
    // Wait for search results
    await searchPage.areSearchResultsVisible();
    
    const searchTime = Date.now() - searchStartTime;
    
    // Assert search completes within acceptable time (3 seconds)
    expect(searchTime).toBeLessThan(3000);
    
    console.log(`Search time: ${searchTime}ms`);
  });

  test('should check Core Web Vitals', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Measure First Contentful Paint (FCP) with timeout
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(null), 5000);
        
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            clearTimeout(timeout);
            resolve(fcpEntry.startTime);
          }
        }).observe({ entryTypes: ['paint'] });
        
        // Fallback: check existing entries
        const existingEntries = performance.getEntriesByType('paint');
        const existingFcp = existingEntries.find(entry => entry.name === 'first-contentful-paint');
        if (existingFcp) {
          clearTimeout(timeout);
          resolve(existingFcp.startTime);
        }
      });
    });
    
    if (fcp) {
      console.log(`First Contentful Paint: ${fcp}ms`);
      expect(fcp).toBeLessThan(5000);
    } else {
      console.log('FCP measurement not available');
    }
  });

  test('should monitor network requests', async ({ page, homePage }) => {
    const requests = [];
    const responses = [];
    
    // Monitor network activity
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        timestamp: Date.now()
      });
    });
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        timestamp: Date.now()
      });
    });
    
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    
    // Analyze network requests
    console.log(`Total requests: ${requests.length}`);
    console.log(`Total responses: ${responses.length}`);
    
    // Check for failed requests
    const failedRequests = responses.filter(response => response.status >= 400);
    expect(failedRequests.length).toBe(0);
    
    // Check for excessive requests
    expect(requests.length).toBeLessThan(50);
  });
});