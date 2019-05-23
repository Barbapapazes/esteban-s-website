// Home page of the site
exports.home = function(req, res, next) {
    if (Object.keys(req.flash('mongoErrors')).length > 0) {
        res.render('index', {
            errors: req.flash('mongoErrors')
        })
    } else {
        res.render('index', {
            errors: req.flash('Authenticated')
        })
    }
}