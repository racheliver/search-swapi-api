import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser;
let page: Page;

const retryOperation = async (operation: () => Promise<void>, maxRetries: number = 3, delay: number = 5000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await operation();
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

beforeAll(async () => {
  await retryOperation(async () => {
    try {
      console.log('Launching browser...');
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      console.log('Browser launched successfully');
    } catch (error) {
      console.error('Failed to launch browser:', error);
      throw error;
    }
  });
}, 30000);

afterAll(async () => {
  try {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
      console.log('Browser closed successfully');
    }
  } catch (error) {
    console.error('Failed to close browser:', error);
  }
});

describe('E2E Tests', () => {
  test('Search and navigate to category', async () => {
    const runTest = async () => {
      console.log('Starting test...');
      page = await browser.newPage();
     
      try {
        console.log('Navigating to homepage...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
       
        console.log('Waiting for root element...');
        await page.waitForSelector('#root', { timeout: 10000 });
       
        console.log('Waiting for search input...');
        await page.waitForSelector('#search', { timeout: 10000 });
        await page.type('#search', 'Luke');
       
        console.log('Waiting for results container...');
        await page.waitForSelector('.results-container', { timeout: 10000 });
        const viewAllButton = await page.waitForSelector('.results-container .view-all-button', { timeout: 10000 });
       
        if (viewAllButton) {
          console.log('Clicking View All button...');
          await viewAllButton.click();
         
          console.log('Waiting for list title...');
          await page.waitForSelector('.list-title', { timeout: 10000 });
         
          console.log('Waiting for network idle...');
          await page.waitForNetworkIdle({ timeout: 10000 });
         
          const currentUrl = page.url();
          console.log('Current URL:', currentUrl);
         
          expect(currentUrl).toContain('/category/');
        } else {
          throw new Error('View All button not found');
        }
      } finally {
        if (page) {
          await page.close();
        }
      }
    };

    await retryOperation(runTest, 3, 5000);
  }, 60000);
});
