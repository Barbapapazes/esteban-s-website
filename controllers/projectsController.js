// Show the projects home page 
exports.projects = function(req, res, next) {
    res.render('projects', { i18n: res, langs: req.i18n.getLocales() });
}