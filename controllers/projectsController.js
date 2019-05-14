// Show the projects home page 
exports.projects = function(req, res, next) {
    res.render('projects', { i18n: res, langs: req.i18n.getLocales() });
}

// Show the form to create project
exports.create = function(req, res, next) {
    res.send('not implemented: create page')
}