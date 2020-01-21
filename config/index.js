const testConfig = require('./test');
const productionConfig = require('./production');
const config = require('./development');

if (process.env.NODE_ENV === 'test') {
  module.exports = { ...config, ...testConfig };
} else if (process.env.NODE_ENV === 'production') {
  module.exports = { ...config, ...productionConfig };
} else {
  module.exports = config;
}