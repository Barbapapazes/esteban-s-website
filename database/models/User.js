const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

// encrypt password before save
UserSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next()
    } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.name)
                next(err)
            } else {
                user.password = hash;
                next()
            }
        })
    }
})

// Virtual for user's URL
UserSchema.virtual('url').get(function() {
    return '/projects/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema)