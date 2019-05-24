const express = require('express');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
// const validate = require('express-validation');
// const controller = require('../../controllers/auth.controller');
const passport = require('passport');

const router = express.Router();

router.use(cookieSession({
  name: 'session',
  keys: [
    'askdhaluu3h1heiuh1',
    /* secret keys */
  ],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

router.route('/login').get(passport.authenticate('openid'));

router.route('/callback').get((req, res, next) => {
  passport.authenticate('openid', { session: false }, (err, user, info) => {
    if (err) {
      if (err.name === 'Error') {
        return res.redirect('/login');
      }
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }

    return res.json({ ...user, _access_token: jwt.decode(user.access_token), _id_token: jwt.decode(user.id_token) });
  })(req, res, next);
});

module.exports = router;
