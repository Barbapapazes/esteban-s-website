// Home page of the site
exports.home = function(req, res, next) {
    res.render('index', {
        errors: req.flash('mongoErrors')
    })
}