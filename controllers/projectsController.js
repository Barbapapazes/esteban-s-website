const url = require('url')
const Post = require('../database/models/Post')

// Show the projects home page 
exports.projects = async(req, res) => {
    const posts = await Post.find().sort({ _id: -1 }).limit(5)

    res.render('projects', { i18n: res, langs: req.i18n.getLocales(), posts: posts });
}

// Show all posts
exports.getAll = async(req, res) => {
    let queryObject = url.parse(req.url, true).query
    res.send(queryObject.page)
}

// Show the form to create project
exports.create = function(req, res) {
    res.render('createPost', { i18n: res, langs: req.i18n.getLocales() });
}

// Store the content from form
exports.store = function(req, res) {
    Post.create({
        ...req.body
    }, (err, post) => {
        res.send(req.body)
    })
}

// View the post corresponding to the id
exports.viewPost = async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.json(post)
}