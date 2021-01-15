const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.instagram.com/';
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({ headless: false });
    instagram.page = await instagram.browser.newPage();

    await instagram.page.goto(BASE_URL, { waitUtil: 'networkidle2' });
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUtil: 'networkidle2' });

    // await instagram.page.waitForNavigation({ waitUtil: 'networkidle2' });
    await instagram.page.waitFor(1000);

    await instagram.page.type('input[name="username"]', username, {
      delay: 50,
    });
    await instagram.page.type('input[name="password"]', password, {
      delay: 50,
    });
    await instagram.page.click('button[type="submit"]');
  },

  likeTagsProcess: async (tags = []) => {
    await this.instagram.page.waitFor(2000);
    for (const tag of tags) {
      await instagram.page.goto(TAG_URL(tag), { waitUtil: 'networkidle2' });
      await instagram.page.waitFor(1500);

      const posts = await instagram.page.$$(
        'article > div:nth-child(3) img[decoding="auto"]'
      );

      for (let i = 0; i < 3; i++) {
        let post = posts[i];

        await post.click();

        // Wait for the modal to appear
        await instagram.page.waitFor(
          'span[id="react-root"][aria-hidden="true"]'
        );
        await instagram.page.waitFor(1000);

        let isLikable = await instagram.page.$('div.QBdPU > span.FY9nT');

        if (isLikable) {
          await instagram.page.click('div.QBdPU > span.FY9nT');
        }

        await instagram.page.waitFor(3000);

        // Close the modal
        await instagram.page.click(
          'body > div._2dDPU.CkGkG > div.Igw0E.IwRSH.eGOV_._4EzTm.BI4qX.qJPeX.fm1AK.TxciK.yiMZG > button'
        );
        await instagram.page.waitFor(1000);
      }

      await instagram.page.waitFor(15000);
    }
  },
};

module.exports = instagram;
