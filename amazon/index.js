const amazon = require('./amazon');

const DETAILS_URL =
  'https://www.amazon.com/Apple-iPad-Air-10-9-inch-Wi-Fi-64GB/dp/B08J66ZMY7';

async function main() {
  await amazon.initialze();

  const details = await amazon.getProductDetails(DETAILS_URL);

  debugger;
}

main();
