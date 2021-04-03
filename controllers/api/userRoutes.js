const router = require('express').Router();
const { User } = require('../../models');
const passport = require('../../utils/passport');
var LocalStrategy = require("passport-local").Strategy;

router.post('/', passport.use('local-signup', new LocalStrategy({
  // by default, local strategy uses username and password, this overrides with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // passes the entire request to the callback
},
  function (req, email, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email': email }, function (err, user) {
      // if there are any errors, return the error
      if (err)
        return done(err);

      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {

        // if there is no user with that email
        // create the user
        var user = User.create();

        user.save((err) => {
          if (err)
            throw err;
          return done(null, user);
        });

      }
    });
  }
)));

passport.use('local-signup', new LocalStrategy({
  // by default, local strategy uses username and password, this overrides with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // passes the entire request to the callback
},
  function (req, email, password, done) {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email': email }, function (err, user) {
      // if there are any errors, return the error
      if (err)
        return done(err);

      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {

        // if there is no user with that email
        // create the user
        var newUser = User.create();

        // set the user's local credentials
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        // save the user
        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, newUser);
        });
      }

    }));

router.post('/login', async (req, res) => {
  let user;

  try {
    user = await promisifiedPassportAuthentication();
  } catch (err) {
    throw err;
  }

  function promisifiedPassportAuthentication() {
    return new Promise((resolve, reject) => {

      passport.authenticate('local', (err, user) => {

        if (err) reject(err);
        if (user) resolve(user);
      })(req, res);
    })
  }
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
