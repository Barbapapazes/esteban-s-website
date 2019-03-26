// GET about home page
exports.about = function(req, res, next) {
    res.render('about', { i18n: res });
}

/// ME ROUTE ///

// GET request to me
exports.me = function(req, res, next) {
    res.render('me', { i18n: res });
}