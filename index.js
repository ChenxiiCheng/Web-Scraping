const puppeteer = require('puppeteer');

(async () => {
  const MOVIE_URL =
    'https://www.imdb.com/title/tt0468569/?ref_=hm_tpks_tt_1_pd_tp1';

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(MOVIE_URL, { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    const title = document.querySelector('div[class="title_wrapper"] > h1')
      .innerText;
    const rating = document.querySelector('span[itemprop="ratingValue"]')
      .innerText;
    const ratingCount = document.querySelector('span[itemprop="ratingCount"]')
      .innerText;

    return { title, rating, ratingCount };
  });

  console.log(data);

  debugger;

  await browser.close();
})();
