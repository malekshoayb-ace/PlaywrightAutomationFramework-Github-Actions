import { BasePage } from './basePage.js';

/**
 * Search Page Object Model
 */
export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search (Ctrl+K)' });
    this.searchResults = page.locator('[data-testid="search-results"]');
    this.noResultsMessage = page.locator('.no-results');
  }

  /**
   * Open search dialog
   */
  async openSearchDialog() {
    await this.searchButton.click();
  }

  /**
   * Perform search with keyword
   * @param {string} keyword - Search keyword
   */
  async search(keyword) {
    await this.openSearchDialog();
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.click();
    await this.searchBox.fill(keyword);
  }

  /**
   * Clear search input
   */
  async clearSearch() {
    await this.searchBox.clear();
  }

  /**
   * Click on search result by text
   * @param {string} resultText - Text of the search result to click
   */
  async clickSearchResult(resultText) {
    const result = this.page.getByRole('link', { name: resultText });
    await result.click();
  }

  /**
   * Get search results count
   * @returns {number} Number of search results
   */
  async getSearchResultsCount() {
    await this.page.waitForTimeout(1000); // Wait for results to load
    const results = this.page.locator('[role="option"]');
    return await results.count();
  }

  /**
   * Get all search result texts
   * @returns {Array} Array of search result texts
   */
  async getSearchResultTexts() {
    await this.page.waitForTimeout(1000);
    const results = this.page.locator('[role="option"]');
    const count = await results.count();
    const texts = [];
    
    for (let i = 0; i < count; i++) {
      const text = await results.nth(i).textContent();
      texts.push(text);
    }
    
    return texts;
  }

  /**
   * Check if search results are displayed
   * @returns {boolean} True if results are visible
   */
  async areSearchResultsVisible() {
    try {
      await this.page.waitForSelector('[role="option"]', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if no results message is displayed
   * @returns {boolean} True if no results message is visible
   */
  async isNoResultsMessageVisible() {
    return await this.noResultsMessage.isVisible();
  }

  /**
   * Search and select first result
   * @param {string} keyword - Search keyword
   */
  async searchAndSelectFirst(keyword) {
    await this.search(keyword);
    const results = this.page.locator('[role="option"]');
    if (await results.count() > 0) {
      await results.first().click();
    }
  }
}