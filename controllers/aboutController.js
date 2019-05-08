// Show about home page
exports.about = function(req, res, next) {
    res.render('about', { i18n: res, langs: req.i18n.getLocales() });
}

// Show me page
exports.me = function(req, res, next) {
    res.render('me', { i18n: res, langs: req.i18n.getLocales() });
}