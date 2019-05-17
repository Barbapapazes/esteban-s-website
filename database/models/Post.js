const mongoose = require('mongoose')

const PostShema = new mongoose.Schema({
    title: String,
    description: String,
    text: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

// Virtual for post's URL
PostShema.virtual('url').get(function() {
    return '/projects/post/' + this._id
})

const Post = mongoose.model('Post', PostShema)

module.exports = Post