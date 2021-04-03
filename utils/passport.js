var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var { User } = require("../models");

passport.use(new LocalStrategy(
    function (email, password, done) {
        User.findOne(email,
            function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Email or password is incorrect' }); }
                if (!user.checkPassword(password)) { return done(null, false, { message: 'Email or password is incorrect' }); }
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



module.exports = passport;