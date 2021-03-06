const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(
    __dirname,
    `../../.env${process.env.ENV ? `.${process.env.ENV.toLowerCase()}` : ''}`
  ),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  openId: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.AUTH_CALLBACK_URL],
    openIdConfigEndpoint: process.env.OPENID_ENDPOINT_CONFIGURATION,
    response_types: ['code'],
  },
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
