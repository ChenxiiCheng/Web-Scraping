const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com/home/';
const LOGIN_URL = 'https://twitter.com/login';
const USERNAME_URL = (username) => `https://twitter.com/${username}`;

let browser = null, page = null;

const twitter = {
  initialize: async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });
  },

  login: async (username, password) => {
    console.log('Start to login...');
    const currentUrl = await page.url;

    if (currentUrl !== LOGIN_URL) {
      await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });
    }

    await page.waitFor('form[action="/sessions"] input[name="session[username_or_email]"]');
    await page.type('form[action="/sessions"] input[name="session[username_or_email]"]', username, {delay: 50});
    await page.type('form[action="/sessions"] input[name="session[password]"]', password, {delay: 50});
    await page.click('div[role="button"][data-testid="LoginForm_Login_Button"]');
    await page.waitFor('.DraftEditor-root');
    await page.waitFor(1000);
  },

  postTweet: async (message) => {
    const url = await page.url();

    if (url !== BASE_URL) {
      await page.goto(BASE_URL, { waitFor: 'networkidle2' });
    }

    await page.waitFor('.DraftEditor-root');
    await page.click('.DraftEditor-root');
    await page.waitFor(500);
    await page.keyboard.type(message, { delay: 50 });
    await page.click('div[role="button"][data-testid="tweetButtonInline"]');
  },

  getUser: async (username) => {
    const url = await page.url();

    if (url !== USERNAME_URL(username)) {
      await page.goto(USERNAME_URL(username));
    }

    const company = page.$x(
      '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[2]/div/div/div[1]/div/div[2]/div/div/div[1]/div/span[1]/span'
    )[0];

    const user = await page.evaluate((el) => {
      return el.innerText;
    }, company);

    console.log(user);
    debugger;
  },

  end: async () => {
    console.log('Close the browser');
    await browser.close();
  },
};

module.exports = twitter;
