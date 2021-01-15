const twitter = require('./twitter');

const USERNAME = 'heychris.xi@gmail.com';
const PASSWORD = '!qwe123qwe';

async function main() {
  try {
    await twitter.initialize();
    await twitter.login(USERNAME, PASSWORD);
    // await twitter.postTweet('Hello world, this is a test message');
    await twitter.getUser('Udemy');

    debugger;
  } catch (e) {
    console.log(`error happens: ${e}`);
  }
}

main();
