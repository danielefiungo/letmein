/* eslint-disable global-require */
const {
  port,
  env,
  openId: { openIdConfigEndpoint },
} = require('./config/vars');
const logger = require('./config/logger');

const { discoverIssuer } = require('./api/services/OIDCProvider');

module.exports = async function Init() {
  const Issuer = await discoverIssuer(openIdConfigEndpoint);

  const passport = require('passport');
  const strategies = require('./config/passport')({ Issuer });
  const app = require('./config/express');

  passport.use('openid', strategies.openid);
  passport.use('bearer', strategies.bearer);
  // const mongoose = require('./config/mongoose');
  // open mongoose connection
  // mongoose.connect();

  // listen to requests
  app.listen(port, () =>
    logger.info(`server started on port ${port} (${env}) : http://localhost:${port}`));
};
