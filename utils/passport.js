const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User } = require("../models");

passport.use('local-login',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email'
    },
        async (email, password, done) => {
            try {
                const genericError = { message: 'Email or password is incorrect' };
                const user = await User.findOne({ where: { email } });

                // Return error if no user
                if (!user) { return done(null, false, genericError); }

                // return if password is incorrect
                if (!user.checkPassword(password)) {
                    return done(null, false, genericError);
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
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        async (req, email, password, done) => {
            try {
                //TODO - check if using exists with that email already?
                const user = await User.create({ email, password, name: req.body.name });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

// serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserialize the user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;