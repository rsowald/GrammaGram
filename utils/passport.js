var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var { User } = require("../models");

passport.use('local-login',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        async (req, email, password, done) => {
            try {
                const genericError = { message: 'Email or password is incorrect' };
                var user = await User.findOne({ where: {email: req.body.email}});
                console.log("USER:" + user);
                console.log("USER:" + user.email);
                console.log("USER:" + user.checkPassword(password));
                if (!user) { return done(null, false, genericError); }
                // if (!user.checkPassword(password)) { return done(null, false, genericError); }
                
                // return if password is incorrect
                if (!user.checkPassword(password)) { 
                    return done(null, false, {message: 'Credentials incorrect'}); 
                }
                
                // return if password is correct
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

passport.use('local-signup',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        async (req, email, password, done) => {
            try {
                //TODO - check if using exists with that email already?
                const user = await User.create({ email, password, name: req.name });

                return done(null, user);
            } catch (err) {
                res.status(400).json(err);
            }
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