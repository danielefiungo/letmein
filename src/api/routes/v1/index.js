const express = require('express');
const authRoutes = require('./auth.route');
const meRoutes = require('./me.route');
const passport = require('passport');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);

router.use('/me', passport.authenticate('bearer'), meRoutes);

router.use('/help', (req, res) => {
  res.send({ auth: { login: { path: '/auth/login' }, me: { path: '/me' } } });
});

module.exports = router;
