const { Issuer, Strategy: OpenIDStrategy } = require('openid-client');
const { openId } = require('../../config/vars');

const discoverIssuer = async (issuerConfigEndpoint) => {
  const issuer = await Issuer.discover(issuerConfigEndpoint);
  console.log('Discovered issuer %s', issuer.issuer);
  return issuer;
};

/**
 *
 *
 * @param {Issuer} issuer
 */
const buildClient = issuer => new issuer.Client(openId);

/**
 *
 *
 * @param {Issuer.Client} Client
 * @param {Function} veryfyCallback
 */
const configStrategy = (Client, verifyCallback) =>
  new OpenIDStrategy({ client: Client }, verifyCallback);

module.exports = { discoverIssuer, buildClient, configStrategy };
