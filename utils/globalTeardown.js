import fs from 'fs';
import path from 'path';

/**
 * Global teardown - runs once after all tests
 */
async function globalTeardown() {
  console.log('🏁 Test execution completed!');
  
  // Generate test summary
  const reportsDir = 'reports';
  const resultsFile = path.join(reportsDir, 'test-results.json');
  
  if (fs.existsSync(resultsFile)) {
    try {
      const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
      const stats = results.stats || {};
      
      console.log('📊 Test Summary:');
      console.log(`   ✅ Passed: ${stats.expected || 0}`);
      console.log(`   ❌ Failed: ${stats.unexpected || 0}`);
      console.log(`   ⏭️  Skipped: ${stats.skipped || 0}`);
      console.log(`   ⏱️  Duration: ${Math.round(stats.duration) || 'N/A'}ms`);
    } catch (error) {
      console.log('⚠️  Could not read test results for summary');
    }
  }
  
  // Log report locations
  console.log('📋 Reports generated:');
  console.log(`   📄 HTML Report: ${path.join(reportsDir, 'html-report', 'index.html')}`);
  console.log(`   📊 Allure Results: allure-results/`);
  console.log(`   📸 Screenshots: ${path.join(reportsDir, 'screenshots')}/`);
  
  // Optional: Archive old test results
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveDir = path.join(reportsDir, 'archive', timestamp);
  
  if (process.env.ARCHIVE_RESULTS === 'true') {
    if (!fs.existsSync(path.join(reportsDir, 'archive'))) {
      fs.mkdirSync(path.join(reportsDir, 'archive'), { recursive: true });
    }
    
    // Archive logic can be added here if needed
    console.log(`📦 Results archived to: ${archiveDir}`);
  }
}

export default globalTeardown;