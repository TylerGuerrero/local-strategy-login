const bcrypt = require('bcryptjs');
const User = require('../models/User')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy((username, password, done) => {

}))