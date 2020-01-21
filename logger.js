
const bunyan = require('bunyan');
const config = require('./config');

module.exports = bunyan.createLogger({
  name: 'recipe-api',
  level: config.logger.level,
});