import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage.js';
import { SearchPage } from '../pages/searchPage.js';
import { DataGenerator } from '../utils/dataGenerator.js';
import { Helpers } from '../utils/helpers.js';
import fs from 'fs';
import path from 'path';

/**
 * Custom fixtures for test setup and page objects
 */
export const test = base.extend({
  // Page Object fixtures
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  // Utility fixtures
  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },

  helpers: async ({}, use) => {
    await use(Helpers);
  },

  // Test data fixture
  testData: async ({}, use) => {
    const testDataPath = path.join(process.cwd(), 'fixtures', 'testData.json');
    const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
    await use(testData);
  },

  // Authenticated user fixture (example)
  authenticatedPage: async ({ page }, use) => {
    // Setup authentication if needed
    // await page.goto('/login');
    // await page.fill('#username', 'testuser');
    // await page.fill('#password', 'testpass');
    // await page.click('#login-button');
    await use(page);
  },

  // Screenshot on failure fixture
  screenshotOnFailure: [async ({ page }, use, testInfo) => {
    await use();
    
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = path.join('reports', 'screenshots', `${testInfo.title}-${Date.now()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      testInfo.attachments.push({
        name: 'screenshot',
        path: screenshotPath,
        contentType: 'image/png'
      });
    }
  }, { auto: true }],

  // Browser context with custom settings
  customContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      permissions: ['geolocation'],
      geolocation: { latitude: 37.7749, longitude: -122.4194 }
    });
    await use(context);
    await context.close();
  }
});

export { expect } from '@playwright/test';