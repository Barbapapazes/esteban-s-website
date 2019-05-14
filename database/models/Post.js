const mongoose = require('mongoose')

const PostShema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', PostShema)

module.exports = Post