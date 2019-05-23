// Home page of the site
exports.home = function(req, res, next) {
    let errors = []
    console.log(req.flash())
    if (Object.keys(req.flash('mongoErrors')).length !== 0) {
        errors = req.flash()
    } else {
        errors = undefined
    }
    console.log(errors)
    res.render('index', {
        errors: errors
    })
}