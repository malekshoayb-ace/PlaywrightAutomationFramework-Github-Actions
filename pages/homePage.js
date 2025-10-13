import { BasePage } from './basePage.js';

/**
 * Home Page Object Model
 */
export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Locators
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.searchButton = page.getByRole('button', { name: 'Search (Ctrl+K)' });
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.apiLink = page.getByRole('link', { name: 'API' });
    this.communityLink = page.getByRole('link', { name: 'Community' });
  }

  /**
   * Navigate to home page
   */
  async navigateToHome() {
    await this.goto(process.env.BASE_URL || 'https://playwright.dev/');
  }

  /**
   * Click Get Started link
   */
  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  /**
   * Open search dialog
   */
  async openSearch() {
    await this.searchButton.click();
  }

  /**
   * Navigate to docs
   */
  async navigateToDocs() {
    await this.docsLink.click();
  }

  /**
   * Navigate to API documentation
   */
  async navigateToAPI() {
    await this.apiLink.click();
  }

  /**
   * Navigate to community
   */
  async navigateToCommunity() {
    await this.communityLink.click();
  }

  /**
   * Verify home page is loaded
   * @returns {boolean} True if home page is loaded
   */
  async isHomePageLoaded() {
    return await this.getStartedLink.isVisible();
  }

  /**
   * Get page heading
   * @returns {string} Page heading text
   */
  async getPageHeading() {
    const heading = this.page.locator('h1').first();
    return await heading.textContent();
  }
}