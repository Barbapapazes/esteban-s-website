const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

module.exports = mongoose.model('User', UserSchema)