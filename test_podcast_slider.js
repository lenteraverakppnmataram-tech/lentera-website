
const puppeteer = require('puppeteer');
const httpServer = require('http-server');
const path = require('path');

const APP_URL = 'http://localhost:8080';
const server = httpServer.createServer({ root: path.resolve(__dirname) });

describe('Podcast Slider Dots', () => {
  let browser;
  let page;

  beforeAll((done) => {
    server.listen(8080, '0.0.0.0', () => {
      console.log('HTTP Server running on http://localhost:8080');
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      console.log('HTTP Server closed');
      done();
    });
  });

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(APP_URL);
  }, 30000);

  afterEach(async () => {
    await browser.close();
  });

  it('should highlight the correct dot when the slider moves', async () => {
    // Wait for the podcast section to be loaded
    await page.waitForSelector('#podcast-slider .podcast-slide');

    // Get the initial active dot
    let activeDotIndex = await page.evaluate(() => {
        const dots = Array.from(document.querySelectorAll('#podcast-dots-container .podcast-dot'));
        return dots.findIndex(dot => dot.classList.contains('bg-purple-600'));
    });
    expect(activeDotIndex).toBe(0);

    // Click the next button
    await page.click('#podcast-next');

    // Wait for the slide to transition
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the new active dot
    activeDotIndex = await page.evaluate(() => {
        const dots = Array.from(document.querySelectorAll('#podcast-dots-container .podcast-dot'));
        return dots.findIndex(dot => dot.classList.contains('bg-purple-600'));
    });
    expect(activeDotIndex).toBe(1);

    // Click the previous button
    await page.click('#podcast-prev');

    // Wait for the slide to transition
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get the new active dot
    activeDotIndex = await page.evaluate(() => {
        const dots = Array.from(document.querySelectorAll('#podcast-dots-container .podcast-dot'));
        return dots.findIndex(dot => dot.classList.contains('bg-purple-600'));
    });
    expect(activeDotIndex).toBe(0);
  }, 30000);
});
