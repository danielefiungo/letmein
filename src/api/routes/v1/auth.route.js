const express = require('express');
// const validate = require('express-validation');
// const controller = require('../../controllers/auth.controller');
const passport = require('passport');

const router = express.Router();

router.route('/login').get(passport.authenticate('openid'));

router
  .route('/callback')
  .get(passport.authenticate('openid', { successRedirect: './test', failureRedirect: '/me' }));

router.route('/test').get((req, res) => {
  res.json({ ...req.user });
});

module.exports = router;

