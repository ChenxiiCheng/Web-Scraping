const ig = require('./instagram');

(async () => {
  await ig.initialize();
  await ig.login('chris1011@yeah.net', 'ccx1103ccx');
  await ig.likeTagsProcess(['cars', 'new york']);
  debugger;
})();
