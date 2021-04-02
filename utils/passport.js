var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var { User } = require("../models");

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username },
            function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
    }
));

// serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// To use in routes: 
// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.render('dashboard', req.user);
//   });

//User model needs hashpassword hook and validpassword proto method

//any routes that are not logging in, use withAuth or  w/e

module.exports = passport;