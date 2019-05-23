module.exports = (req, res, next) => {
    if (req.session.user) {
        req.flash('Authenticated', ['Already Authenticated'])
        return res.redirect('/')
    }
    next()
}