const router = require('express').Router();
const { authCheck } = require('../middleware/AuthCheck')
const { index_get, dashboard_get } = require('../controllers/indexController')

router.get('/', index_get)

router.get('/dashboard', authCheck, dashboard_get)

module.exports = router