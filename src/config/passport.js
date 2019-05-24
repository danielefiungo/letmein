const authProviders = require('../api/services/OIDCProvider');
const BearerStrategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');

function configurePassport({ Issuer }) {
  const Client = authProviders.buildClient(Issuer);

  const bearer = new BearerStrategy((token, done) => {
    Client.userinfo(token)
      .then((user) => {
        if (user) return done(null, { ...(jwt.decode(token)), ...user });
        if (!user) {
          return done(null, false);
        }
        return done(null, user, { scope: 'all' });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });

  const openid = authProviders.configStrategy(Client, (tokenSet, userInfo, done) => {
    done(null, { ...userInfo, ...tokenSet });
  });

  return {
    bearer,
    openid,
  };
}

module.exports = configurePassport;
