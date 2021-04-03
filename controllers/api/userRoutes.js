const router = require('express').Router();
const { User } = require('../../models');
const passport = require('../../utils/passport');
var LocalStrategy = require("passport-local").Strategy;

// router.post('/', passport.authenticate('local-signup'));
// router.post('/login', passport.authenticate('local-login'));

router.post('/', 
  passport.authenticate('local-signup', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.post('/login', 
  passport.authenticate('local-login', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
