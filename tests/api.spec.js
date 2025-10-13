import { test, expect } from '../fixtures/customFixtures.js';

test.describe('API Testing Integration', () => {
  test('should perform API request and validate response', async ({ request }) => {
    // Example API test using Playwright's request context
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.name).toBe('playwright');
    expect(data.owner.login).toBe('microsoft');
  });

  test('should test API with POST request', async ({ request, dataGenerator }) => {
    // Generate test data
    const userData = dataGenerator.generateUser();
    
    // Example POST request (using JSONPlaceholder for demo)
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
    });
    
    expect(response.status()).toBe(201);
    
    const responseData = await response.json();
    expect(responseData.name).toBe(userData.firstName + ' ' + userData.lastName);
    expect(responseData.email).toBe(userData.email);
  });

  test('should validate API response headers', async ({ request }) => {
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');
    
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['server']).toBeDefined();
  });
}); 