// Home page of the site
exports.home = function(req, res, next) {
    let errors = req.flash('mongoErrors')
    if (Object.keys(errors).length == 0) {
        errors = undefined
    }
    res.render('index', {
        errors: errors
    })
}