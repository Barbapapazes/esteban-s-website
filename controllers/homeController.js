// Home page of the site
exports.home = function(req, res, next) {
    res.render('index', { i18n: res, langs: req.i18n.getLocales() });
}