// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
require('./config/vars');
require('./config/logger');
const Init = require('./init');

(async () => {
  await Init();
})();
