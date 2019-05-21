const authProviders = require('../api/services/OIDCProvider');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

function configurePassport({ Issuer }) {
  const Client = authProviders.buildClient(Issuer);

  passport.serializeUser((user, done) => {
    done(null, { sub: user.sub, at: user.sec.access_token });
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  const bearer = new BearerStrategy((token, done) => {
    Client.userinfo(token).then((user) => {
      if (user) return done(null, { ...user, sec: { access_token: token } });
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    });
  });

  return {
    bearer,
    openid: authProviders.configStrategy(Client, (tokenSet, userInfo, done) => {
      done(null, { ...userInfo, sec: tokenSet });
    }),
  };
}

module.exports = configurePassport;
