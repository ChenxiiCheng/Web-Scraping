const request = require('request-promise');
const cheerio = require('cheerio');

const BASE_URL = 'https://dev.to/';
const USERNAME = 'grohsfabian';

(async () => {
  const response = await request(`${BASE_URL}${USERNAME}`);
  const $ = cheerio.load(response, { normalizeWhitespace: true });

  // parse details from page
  const fullName = $('span[itemprop="name"]').text().trim();
  const desc = $('p[itemprop="description]').text().trim();
  const profilePictureUrl = $('div[class="profile-pic-wrapper"] > img').attr(
    'href'
  );
  let socials = [];
  $('p[class="social"] > a').each((index, ele) => {
    const url = $(ele).attr('href');
    socials.push(url);
  });
  let details = [];
  $('div[class="user-metadata-details-inner"] > div[class="row"]').each(
    (index, ele) => {
      // $(ele).find('div[class="key"]')
      const key = $(ele).find('.key').text().trim();
      const value = $(ele).text('.value').text().trim();
      details[key] = value;
    }
  );

  let statistics = [];

  $('div[class="sidebar-data"] > div').each((index, ele) => {
    const string = $(ele).text().trim();
    statistics.push(string);
  });

  console.log({
    fullName,
    desc,
    profilePictureUrl,
    details,
    socials,
    statistics,
  });
})();
