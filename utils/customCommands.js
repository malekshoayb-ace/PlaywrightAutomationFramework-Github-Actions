/**
 * Custom commands and utility functions for common test actions
 */

export class CustomCommands {
  constructor(page) {
    this.page = page;
  }

  /**
   * Enhanced search function with retry logic
   * @param {string} searchTerm - Term to search for
   * @param {number} retries - Number of retries (default: 3)
   */
  async searchWithRetry(searchTerm, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        await this.page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();
        await this.page.getByRole('searchbox', { name: 'Search' }).fill(searchTerm);
        
        // Wait for search results
        await this.page.waitForSelector('[role=\"option\"]', { timeout: 5000 });
        return true;
      } catch (error) {
        console.log(`Search attempt ${i + 1} failed: ${error.message}`);
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Wait for element with custom timeout and error message
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   * @param {string} errorMessage - Custom error message
   */
  async waitForElementWithMessage(selector, timeout = 30000, errorMessage = '') {
    try {
      await this.page.waitForSelector(selector, { timeout });
    } catch (error) {
      const message = errorMessage || `Element '${selector}' not found within ${timeout}ms`;
      throw new Error(message);
    }
  }

  /**
   * Scroll to element and click
   * @param {string} selector - Element selector
   */
  async scrollAndClick(selector) {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
    await element.click();
  }

  /**
   * Fill form with data object
   * @param {Object} formData - Object with field selectors as keys and values to fill
   */
  async fillForm(formData) {
    for (const [selector, value] of Object.entries(formData)) {
      await this.page.fill(selector, value);
    }
  }

  /**
   * Take screenshot with timestamp
   * @param {string} name - Screenshot name
   */
  async takeTimestampedScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    await this.page.screenshot({ 
      path: `reports/screenshots/${filename}`,
      fullPage: true 
    });
    return filename;
  }

  /**
   * Wait for network to be idle
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForNetworkIdle(timeout = 30000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Check if element exists without throwing error
   * @param {string} selector - Element selector
   * @returns {boolean} True if element exists
   */
  async elementExists(selector) {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get element attribute value
   * @param {string} selector - Element selector
   * @param {string} attribute - Attribute name
   * @returns {string} Attribute value
   */
  async getElementAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Hover over element
   * @param {string} selector - Element selector
   */
  async hoverElement(selector) {
    await this.page.hover(selector);
  }

  /**
   * Double click element
   * @param {string} selector - Element selector
   */
  async doubleClickElement(selector) {
    await this.page.dblclick(selector);
  }

  /**
   * Right click element
   * @param {string} selector - Element selector
   */
  async rightClickElement(selector) {
    await this.page.click(selector, { button: 'right' });
  }
}