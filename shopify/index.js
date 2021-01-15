const puppeteer = require('puppeteer');

// console.log(await browser.userAgent());
async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/88.0.4298.0 Safari/537.36'
    );
    await page.goto('https://experts.shopify.com/');
    await page.waitForSelector('._3EE3N');

    const sections = await page.$$(
      '#js-experts-mount > div > div > div > main > div._1yDJZ._3k26L > div > div'
    );

    for (const section of sections) {
      const button = section.$('a.marketing-button');
      button.click();
    }

    debugger;
  } catch (e) {
    console.log('our error', e);
  }
}

main();
