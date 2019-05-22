const url = require('url')

// Require to use the markdown service
const emoji = require('markdown-it-emoji')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')
const abbr = require('markdown-it-abbr')
const ins = require('markdown-it-ins')
const mark = require('markdown-it-mark')
const footnote = require('markdown-it-footnote')
const deflist = require('markdown-it-deflist')
const container = require('markdown-it-container')

// Start markdown
const md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true,
    })
    .use(emoji)
    .use(sub)
    .use(sup)
    .use(abbr)
    .use(ins)
    .use(mark)
    .use(footnote)
    .use(deflist)
    .use(container)

// Require for models from DB
const Post = require('../database/models/Post')
const Genre = require('../database/models/Genre')

// Display the projects home page (5 posts)
exports.projects = async(req, res) => {
    await Post.find().sort({ _id: -1 }).limit(5).populate('genre').populate('username', 'name').exec((err, posts) => {
        if (err) {
            const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        } else if (posts.length == 0) {
            const mongoErrors = ['Posts not found']
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        }
        res.render('projects', {
            posts: posts,
        })
    })
}

// Display all posts (not only 5)
exports.getAll = async(req, res) => {
    let queryObject = url.parse(req.url, true).query
    res.send(queryObject.page)
}

// Display the form to create project
exports.create_post = async(req, res) => {
    await Genre.find().exec(function(err, genres) {
        if (err) {
            const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        } else if (genres.length == 0) {
            const mongoErrors = ['Genres not found']
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        }
        res.render('post_form', {
            genres: genres,
            username: req.session.user.name,
            errors: req.flash('mongoErrors')
        })
    })
}

// Store the content from form
exports.store_post = [

    // Convert the genre to an array
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        // To store the id and be able to populate
        req.body.username = req.session.user.id
        next()
    },

    (req, res) => {
        Post.create({
            ...req.body
        }, (err, post) => {
            if (err) {
                const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
                req.flash('mongoErrors', mongoErrors)
                return res.redirect('/projects/post/create')
            }
            res.redirect('/')
        })
    }
]

// View the post corresponding to the id
exports.view_post = async(req, res) => {
    await Post.findById(req.params.id)
        .exec((err, post) => {
            if (err) {
                const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
                req.flash('mongoErrors', mongoErrors)
                return res.redirect('/')
            } else if (post == null) {
                const mongoErrors = ['Post not found']
                req.flash('mongoErrors', mongoErrors)
                return res.redirect('/')
            }
            // Render the markdown to HTML
            post.text = md.render(post.text)
            res.render('article', {
                post: post
            })
        })
}

exports.create_genre = function(req, res) {
    res.render('genre_form', {
        errors: req.flash('mongoErrors')
    })
}

// Store the content from form
exports.store_genre = function(req, res) {
    Genre.create({
        ...req.body
    }, (err, post) => {
        if (err) {
            const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/projects/genre/create')
        }
        res.redirect('/')
    })
}

// View the post corresponding to the id
exports.view_genre_posts = async(req, res) => {
    await Post.find({ 'genre': req.params.id }).populate('genre').populate('username', 'name').exec(function(err, results) {
        if (err) {
            const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        } else if (results.length == 0) {
            const mongoErrors = ['Posts not found']
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        }
        res.render('projects', {
            posts: results
        })
    })
}

// View the post corresponding to the id
exports.view_user_posts = async(req, res) => {
    await Post.find({ 'username': req.params.id }).populate('genre').populate('username', 'name').exec(function(err, results) {
        if (err) {
            const mongoErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        } else if (results.length == 0) {
            const mongoErrors = ['Posts not found']
            req.flash('mongoErrors', mongoErrors)
            return res.redirect('/')
        }
        res.render('projects', {
            posts: results
        })
    })
}