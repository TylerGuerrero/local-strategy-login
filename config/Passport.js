const bcrypt = require('bcryptjs');
const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        {usernameField: 'email'},
        async (email, password, done) => {
            try {
                const user = await User.findOne({email}).exec();

                if (!user) {
                    return done(null, false, {message: 'Incorrect UserName'})
                }
    
                const isMatch = await bcrypt.compare(password, user.password)
    
                if (isMatch) {
                    // set req.user to user
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Incorrect password'})
                }
            } catch(err) {
               return done(err, false, {message: 'ServerSide error'})
            }
    }))
    
    passport.serializeUser((user, done) => {
        // sets req.user to user
        return done(null, user.id)
    })
    
    passport.deserializeUser((id, done) => {
        User.findById(id)
        .then((user) => {
            // sets req.user to user
            return done(null, user)
        })
        .catch((err)=> {
            return done(err, false, {message: 'Could not deserilize User'});
        })
    })
}