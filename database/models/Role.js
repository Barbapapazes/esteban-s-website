const mongoose = require('mongoose')

let Schema = mongoose.Schema

let roleSchema = new Schema({
    role: {
        type: String
    }
})

module.exports = mongoose.model('Role', roleSchema)