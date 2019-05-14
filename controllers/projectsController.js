const Post = require('../database/models/Post')

// Show the projects home page 
exports.projects = function(req, res, next) {
    res.render('projects', { i18n: res, langs: req.i18n.getLocales() });
}

// Show the form to create project
exports.create = function(req, res, next) {
    res.render('createPost', { i18n: res, langs: req.i18n.getLocales() });
}

// Store the content from form
exports.store = function(req, res, next) {
    Post.create({
        ...req.body
    }, (err, post) => {
        res.send(req.body)
    })

}