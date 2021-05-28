const User = require('../models/User')
const bcyrpt = require('bcryptjs')
const passport = require('passport')

const login_get = (req, res) => {
    res.render('login')
}

const register_get = (req, res) => {
    res.render('register')
}

const register_post = async (req, res) => {
    const { name, email, password, password2 } = req.body

    let errors = []
    
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'})
    }

    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'})
    }

    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', { errors, name, email, password, password2})
    } 

    try {
        const user = await User.findOne({email});

        if (user) {
            errors.push({msg: 'Email is already in use'})
            res.render('register', {errors, name, email, password, password2})
        } else {
            const newUser = new User({name, email, password})
            const salt = await bcyrpt.genSalt(10);
            newUser.password = await bcyrpt.hash(newUser.password, salt);
            const savedUser = await newUser.save()
            req.flash('success_msg', 'You are now registered and can login')
            console.log(savedUser)
            res.redirect('/users/login')
        }   
    } catch (err) {
        console.log(err)
    }
}

const login_post = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
}

const logout_get = (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
}

module.exports = {
    login_get,
    register_get,
    register_post,
    login_post,
    logout_get
}