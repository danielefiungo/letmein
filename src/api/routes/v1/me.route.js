const express = require('express');
// const validate = require('express-validation');
// const controller = require('../../controllers/auth.controller');
const passport = require('passport');

const router = express.Router();

router.route('/').get(passport.authenticate('bearer'), (req, res) => {
  res.json(req.user);
});

module.exports = router;
