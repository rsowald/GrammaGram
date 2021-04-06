const router = require('express').Router();
const passport = require('../../utils/passport');

router.post('/',
  passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/login' }));

router.post('/login',
  passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/login' }));

router.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
