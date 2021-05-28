const index_get = (req, res) => {
    res.render('welcome')
}

const dashboard_get = (req, res) => {
    res.render('dashboard', {user: req.user})
}

module.exports = {
    index_get,
    dashboard_get
}