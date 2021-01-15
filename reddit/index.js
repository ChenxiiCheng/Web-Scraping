const Reddit = require('./reddit');

async function main() {
  const reddit = new Reddit();

  await reddit.initialize('node');
  const results = await reddit.getResults(10);

  debugger;
}

main();
