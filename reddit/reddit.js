const puppeteer = require('puppeteer');

const SUBREDDIT_URL = (reddit) => `https://old.reddit.com/r/${reddit}`;

class Reddit {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize(reddit) {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();

    // Go to the subreddit
    await this.page.goto(SUBREDDIT_URL(reddit), { waitUntil: 'networkidle0' });
  }

  async getResults(number) {
    const elements = await this.page.$$('#siteTable > div[class*="thing"]');

    let results = [];

    for (const element of elements) {
      console.log('element', element);
      const title = await element.$eval('p[class="title"]', (e) =>
        e.innerText.trim()
      );
      console.log('title = ', title);
      const rank = await element.$eval('span.rank', (e) => e.innerText.trim());
      console.log('rank = ', rank);
      const postTime = await element.$eval('p.tagline > time', (e) =>
        e.getAttribute('title')
      );
      const authorUrl = await element.$eval(
        'p[class="tagline "] > a[class*="author"]',
        (e) => e.getAttribute('href')
      );
      const authorName = await element.$eval(
        'p[class="tagline "] > a[class*="author"]',
        (e) => e.innerText.trim()
      );
      const score = await element.$eval('div[class="score likes"]', (e) =>
        e.innerText.trim()
      );
      const comments = await element.$eval(
        'a[data-event-action="comments"]',
        (e) => e.innerText.trim()
      );

      results.push({
        title,
        rank,
        postTime,
        authorUrl,
        authorName,
        score,
        comments,
      });
    }

    return results;
  }
}

// const self = {
//   browser: null,
//   page: null,

//   getResults: async (number) => {
//     const elements = await self.page.$$('#siteTable > div[class*="thing"]');

//     let results = [];

//     for (const element of elements) {
//       console.log('element', element);
//       const title = await element.$eval('p[class="title"]', (e) =>
//         e.innerText.trim()
//       );
//       console.log('title = ', title);
//       const rank = await element.$eval('span.rank', (e) => e.innerText.trim());
//       console.log('rank = ', rank);
//       const postTime = await element.$eval('p.tagline > time', (e) =>
//         e.getAttribute('title')
//       );
//       const authorUrl = await element.$eval(
//         'p[class="tagline "] > a[class*="author"]',
//         (e) => e.getAttribute('href')
//       );
//       const authorName = await element.$eval(
//         'p[class="tagline "] > a[class*="author"]',
//         (e) => e.innerText.trim()
//       );
//       const score = await element.$eval('div[class="score likes"]', (e) =>
//         e.innerText.trim()
//       );
//       const comments = await element.$eval(
//         'a[data-event-action="comments"]',
//         (e) => e.innerText.trim()
//       );

//       results.push({
//         title,
//         rank,
//         postTime,
//         authorUrl,
//         authorName,
//         score,
//         comments,
//       });
//     }

//     return results;
//   },
// };

module.exports = Reddit;
