const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  const MOVIE_URL = 'https://www.imdb.com/title/tt0993846/?ref_=nv_sr_srsg_0';
  const response = await request(MOVIE_URL);
  const $ = cheerio.load(response);

  const title = $('div[class="title_wrapper"] > h1').text();
  const poster = $('div[class="poster"] > a > img').attr('src');
  const ratingValue = $(
    '#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span'
  ).text();

  console.log(title, poster, ratingValue);
})();
