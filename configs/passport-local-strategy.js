const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true // passport can now take req function as callback and pass along
    },
    function (req, email, password, done) {
        // find a user and establish the identity
        User.findOne({email: email}, function (err, user) {
            if (err) {

                return done(err);
            }

            if (!user || user.password != password) {

                return done(null, false);
            }

            return done(null, user);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('back')
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next()
}
passport.adminAuth = (req, res, next) => {
    if (req.user.userType == 'admin') {
        return next()
    }
    return res.redirect('back')
}
passport.checkEmployeeAuth = (req, res, next) => {
    if (req.user.userType !== 'admin') {
        return next()
    }
    return res.redirect('/')
}

module.exports = passport;