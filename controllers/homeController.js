// GET Home
exports.home = function(req, res, next) {
    res.render('index', { i18n: res });
}