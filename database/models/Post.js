const mongoose = require('mongoose')

const PostShema = new mongoose.Schema({
    genre: String,
    title: String,
    subtitle: String,
    description: String,
    timeToRead: Number,
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

// Virtual for post's day
PostShema.virtual('day').get(function() {
    return this.createdAt.toLocaleString('en-us', { day: 'numeric' })
})

// Virtual for post's month
PostShema.virtual('month').get(function() {
    return (this.createdAt).toLocaleString('en-us', { month: 'short' })
})

const Post = mongoose.model('Post', PostShema)

module.exports = Post