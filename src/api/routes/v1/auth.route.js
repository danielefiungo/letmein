const express = require('express');
const cookieSession = require('cookie-session');
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

router.route('/callback').get(passport.authenticate('openid'), (req, res, next) => {
  console.log(req.session.inspect());
  res.json(req.user);
});

module.exports = router;
