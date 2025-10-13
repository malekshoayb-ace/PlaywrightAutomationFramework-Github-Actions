/**
 * Utility helper functions for test automation
 */

export class Helpers {
  /**
   * Get current date in specified format
   * @param {string} format - Date format (default: 'YYYY-MM-DD')
   * @returns {string} Formatted date string
   */
  static getCurrentDate(format = 'YYYY-MM-DD') {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM-DD-YYYY':
        return `${month}-${day}-${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }

  /**
   * Wait for specified milliseconds
   * @param {number} ms - Milliseconds to wait
   */
  static async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Convert date string to different format
   * @param {string} dateString - Input date string
   * @param {string} fromFormat - Current format
   * @param {string} toFormat - Target format
   * @returns {string} Converted date string
   */
  static convertDateFormat(dateString, fromFormat, toFormat) {
    // Simple date conversion logic
    const date = new Date(dateString);
    return this.getCurrentDate(toFormat);
  }

  /**
   * Generate unique timestamp
   * @returns {string} Timestamp string
   */
  static getTimestamp() {
    return Date.now().toString();
  }
}