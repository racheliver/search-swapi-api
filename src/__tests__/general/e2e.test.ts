import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
});

afterAll(async () => {
  await browser.close();
});

describe('E2E Tests', () => {
  test('Search and navigate to category', async () => {
    page = await browser.newPage();
    
    try {
      await page.goto('http://localhost:5173');
      
      await page.waitForSelector('#search');
      await page.type('#search', 'Luke');
      
      await page.waitForSelector('.results-container');
      const viewAllButton = await page.waitForSelector('.results-container .view-all-button');
      
      if (viewAllButton) {
        await viewAllButton.click();
        
        // Instead of waiting for navigation, wait for a specific element on the category page
        await page.waitForSelector('.list-title', { timeout: 5000 });
        
        // Wait a short time for any client-side routing to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the current URL
        const currentUrl = page.url();
        console.log('Current URL:', currentUrl);
        
        // Check if the URL contains '/category/'
        expect(currentUrl).toContain('/category/');
      } else {
        throw new Error('View All button not found');
      }
    } catch (error) {
      console.error('Test failed:', error);
      await page.screenshot({ path: 'error-screenshot.png' });
      throw error;
    } finally {
      await page.close();
    }
  }, 30000);
});
