require('dotenv').config()
    // Require
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

// Router for all routes
const indexRouter = require('./routes/index')
const langRouter = require('./routes/lang')
const homeRouter = require('./routes/home')
const projectsRouter = require('./routes/projects')
const aboutRouter = require('./routes/about')
const usersRouter = require('./routes/users')


// set up i18n, for support multiple languages
const i18n = require('./services/i18n')


// Create express App
const app = express()

const environment = process.env.NODE_ENV

// Middlewares
const sassMiddleware = require('./middlewares/sass')

// Connection to mongoose
const mongoURI = process.env.MONGO_ATLAS_URI
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('You are now connected to mongo!'))
    .catch(err => console.error('Something went wrong', err))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


// Use definition for express
if (environment !== 'production') {
    app.set('json spaces', 2);
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/stylesheets', sassMiddleware)
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser("PSZg88X]cu;U`vs<"))

// create the store for cookies id
const mongoStore = connectMongo(session)

// Create Session
app.use(session({
    secret: "PSZg88X]cu;U`vs<",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: (2 * 86400 * 1000) },
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use(connectFlash())

//init i18n after cookie-parser
app.use(i18n.init);
// use the i18n
app.use(function(req, res, next) {
    res.i18n = i18n;
    req.i18n = i18n;
    res.locals.session = req.session
    res.locals.i18n = res
    res.locals.langs = i18n.getLocales()
    next();
})

// Path
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