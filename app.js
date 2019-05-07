var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');


var indexRouter = require('./routes/index');
var langRouter = require('./routes/lang');
var homeRouter = require('./routes/home');
var projectsRouter = require('./routes/projects');
var aboutRouter = require('./routes/about');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/stylesheets', sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false,
    // true = .sass and false = .scss
    outputStyle: 'compressed',
    sourceMap: true
}));

// set up i18n, for support multiple languages
var i18n = require('./services/i18n')

app.use(cookieParser("PSZg88X]cu;U`vs<"));

app.use(session({
    secret: "PSZg88X]cu;U`vs<",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

//init i18n after cookie-parser
app.use(i18n.init);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/lang', langRouter);
app.use('/home', homeRouter);
app.use('/projects', projectsRouter);
app.use('/about', aboutRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;