import { faker } from '@faker-js/faker';

/**
 * Data generator using Faker.js for dynamic test data
 */
export class DataGenerator {
  /**
   * Generate random user data
   * @returns {Object} User object with random data
   */
  static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      }
    };
  }

  /**
   * Generate random search terms
   * @returns {Array} Array of search terms
   */
  static generateSearchTerms() {
    return [
      faker.lorem.word(),
      faker.hacker.noun(),
      faker.commerce.product(),
      'javascript',
      'typescript',
      'playwright'
    ];
  }

  /**
   * Generate random company data
   * @returns {Object} Company object
   */
  static generateCompany() {
    return {
      name: faker.company.name(),
      industry: faker.commerce.department(),
      website: faker.internet.url(),
      email: faker.internet.email()
    };
  }

  /**
   * Generate random product data
   * @returns {Object} Product object
   */
  static generateProduct() {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      category: faker.commerce.department()
    };
  }

  /**
   * Generate random text content
   * @param {number} sentences - Number of sentences
   * @returns {string} Random text
   */
  static generateText(sentences = 3) {
    return faker.lorem.sentences(sentences);
  }
}