import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
const env = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${env}` });
dotenv.config({ path: '.env' });

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],

  globalSetup: './utils/globalSetup.js',
  globalTeardown: './utils/globalTeardown.js',
  outputDir: 'reports/test-results'
});

