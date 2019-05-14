const sassMiddleware = require('node-sass-middleware')
const path = require('path')

module.exports = sassMiddleware({
    src: path.join(__dirname, '../sass'),
    dest: path.join(__dirname, '../public/stylesheets'),
    indentedSyntax: false,
    // true = .sass and false = .scss
    outputStyle: 'compressed',
    sourceMap: true
})