const puppeteer = require('puppeteer');

let browser = null;
let page = null;

const BASE_URL = 'https://amazon.com/';

const amazon = {
  initialze: async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  },

  getProductDetails: async (link) => {
    await page.goto(link, { waitUntil: 'networkidle2' });

    const details = await page.evaluate(() => {
      const title = document.querySelector('#productTitle').innerText;
      const currentPrice = document.querySelector('#priceblock_ourprice,#priceblock_dealprice').innerText;
      const rating = document.querySelector('#acrPopover').getAttribute('title');
      const totalRating = document.querySelector('#acrCustomerReviewText').innerText;

      return {
        title,
        currentPrice,
        rating,
        totalRating,
      };
    });

    return details;
  },

  end: async () => {
    await browser.close();
  },
};

module.exports = amazon;
