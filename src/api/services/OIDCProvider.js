const { Issuer, Strategy: OpenIDStrategy, custom } = require('openid-client');
const { openId } = require('../../config/vars');

const discoverIssuer = async issuerConfigEndpoint => {
  const issuer = await Issuer.discover(issuerConfigEndpoint);
  console.log('Discovered issuer %s', issuer.issuer);
  return issuer;
};

/**
 *
 *
 * @param {Issuer} issuer
 */
const buildClient = issuer => {
  const client = new issuer.Client(openId);
  client[custom.clock_tolerance] = 5;
  return client;
};

/**
 *
 *
 * @param {Issuer.Client} Client
 * @param {Function} veryfyCallback
 */
const configStrategy = (Client, verifyCallback) =>
  new OpenIDStrategy(
    {
      client: Client,
      params: { scope: 'openid email profile offline_access' },
    },
    verifyCallback
  );

module.exports = { discoverIssuer, buildClient, configStrategy };
