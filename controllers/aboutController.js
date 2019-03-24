// GET about home page
exports.about = function(req, res, next) {
    res.render('about');
}

/// ME ROUTE ///

// GET request to me
exports.me = function(req, res, next) {
    res.render('me');
}