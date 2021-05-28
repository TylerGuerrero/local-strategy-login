const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash('err_msg', 'Please log in to view this resource')
        res.redirect('/users/login')
    }
}

module.exports = {
    authCheck
}