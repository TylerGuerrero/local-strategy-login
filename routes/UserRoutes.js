const router = require('express').Router()

const {
        login_get, 
        login_post, 
        logout_get, 
        register_get, 
        register_post } = require('../controllers/UserController')

router.get('/login', login_get)

router.get('/register', register_get)

router.post('/register', register_post)

router.post('/login', login_post)

router.get('/logout', logout_get)

module.exports = router;