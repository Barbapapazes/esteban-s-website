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
        if (err) throw err
        res.redirect('/')
    })
}

// View the post corresponding to the id
exports.viewPost = async(req, res) => {
    let post = await Post.findById(req.params.id)
    post.text = md.render(post.text)
    console.log(post.text)
    res.render('article', { i18n: res, langs: req.i18n.getLocales(), post: post })
}