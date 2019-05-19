const url = require('url')
const emoji = require('markdown-it-emoji')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')
const abbr = require('markdown-it-abbr')
const ins = require('markdown-it-ins')
const mark = require('markdown-it-mark')
const footnote = require('markdown-it-footnote')
const deflist = require('markdown-it-deflist')
const container = require('markdown-it-container')
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
const Post = require('../database/models/Post')
const Genre = require('../database/models/Genre')

// Show the projects home page 
exports.projects = async(req, res) => {
    const posts = await Post.find().sort({ _id: -1 }).limit(5).populate('genre').exec(function(err, results) {
        res.render('projects', {
            i18n: res,
            langs: req.i18n.getLocales(),
            posts: results
        });
    })

}

// Show all posts
exports.getAll = async(req, res) => {
    let queryObject = url.parse(req.url, true).query
    res.send(queryObject.page)
}

// Show the form to create project
exports.post = async(req, res) => {
    const genres = await Genre.find()

    res.render('post_form', {
        i18n: res,
        langs: req.i18n.getLocales(),
        genres: genres
    });
}

// Store the content from form
exports.store_post = [

    // Convert the genre to an array.
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },


    function(req, res) {
        Post.create({
            ...req.body
        }, (err, post) => {
            if (err) throw err
            res.redirect('/')
        })
    }
]

// View the post corresponding to the id
exports.viewPost = async(req, res) => {
    let post = await Post.findById(req.params.id)
    post.text = md.render(post.text)
    console.log(post.text)
    res.render('article', { i18n: res, langs: req.i18n.getLocales(), post: post })
}

exports.genre = function(req, res) {
    res.render('genre_form', { i18n: res, langs: req.i18n.getLocales() });
}

// Store the content from form
exports.store_genre = function(req, res) {
    Genre.create({
        ...req.body
    }, (err, post) => {
        if (err) throw err
        res.redirect('/')
    })
}

// View the post corresponding to the id
exports.view_genre = async(req, res) => {
    let genre = await Genre.findById(req.params.id)
    res.send(genre)
}