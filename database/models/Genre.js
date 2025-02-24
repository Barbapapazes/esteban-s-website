const mongoose = require('mongoose')

let Schema = mongoose.Schema

let genreSchema = new Schema({
    name: { type: String, required: true, min: 3, max: 100 }
})

genreSchema.virtual('url').get(function() {
    return '/projects/genre/' + this._id
})

module.exports = mongoose.model('Genre', genreSchema)