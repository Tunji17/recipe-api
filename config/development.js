module.exports = {
  mongo: {
    url: process.env.MONGODB_URL,
  },
  logger: {
    level: process.env.LOGGERLEVEL || 'debug',
  },
  baseUrl: process.env.BASEURL,
  port: process.env.PORT,
  secrect: process.env.SECRET,
};