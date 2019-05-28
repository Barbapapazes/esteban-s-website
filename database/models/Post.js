const mongoose = require('mongoose')

let Schema = mongoose.Schema

const PostShema = new mongoose.Schema({
    en: {
        title: String,
        subtitle: String,
        description: String,
        text: {
            type: String,
            required: true
        },
    },
    fr: {
        title: String,
        subtitle: String,
        description: String,
        text: {
            type: String,
            required: true
        }
    },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    timeToRead: Number,
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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