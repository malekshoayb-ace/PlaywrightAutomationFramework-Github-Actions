import fs from 'fs';
import path from 'path';

/**
 * Global setup - runs once before all tests
 */
async function globalSetup() {
  console.log('🚀 Starting test execution...');
  
  // Create reports directories if they don't exist
  const reportDirs = [
    'reports',
    'reports/screenshots',
    'reports/videos',
    'reports/html-report',
    'reports/test-results',
    'allure-results'
  ];

  reportDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });

  // Log environment info
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'dev'}`);
  console.log(`🔗 Base URL: ${process.env.BASE_URL || 'https://playwright.dev'}`);
  console.log(`⏱️  Timeout: ${process.env.TIMEOUT || 30000}ms`);
  
  // Clean up old reports (optional)
  const screenshotsDir = 'reports/screenshots';
  if (fs.existsSync(screenshotsDir)) {
    const files = fs.readdirSync(screenshotsDir);
    files.forEach(file => {
      const filePath = path.join(screenshotsDir, file);
      const stats = fs.statSync(filePath);
      const now = new Date().getTime();
      const fileTime = new Date(stats.mtime).getTime();
      
      // Delete files older than 7 days
      if (now - fileTime > 7 * 24 * 60 * 60 * 1000) {
        fs.unlinkSync(filePath);
        console.log(`🗑️  Cleaned up old screenshot: ${file}`);
      }
    });
  }
}

export default globalSetup;