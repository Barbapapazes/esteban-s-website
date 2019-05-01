// GET Index 
exports.index = function(req, res, next) {
    res.render('index', { i18n: res });
}