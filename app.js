// Require
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')

// Router for all routes
const indexRouter = require('./routes/index')
const langRouter = require('./routes/lang')
const homeRouter = require('./routes/home')
const projectsRouter = require('./routes/projects')
const aboutRouter = require('./routes/about')
const usersRouter = require('./routes/users')

// Middlewares
const sassMiddleware = require('./middlewares/sass')

// set up i18n, for support multiple languages
const i18n = require('./services/i18n')


// Create express App
const app = express()

// Connection to mongoose
mongoose.connect('mongodb://localhost:27017/esteban-s-website', { useNewUrlParser: true })
    .then(() => 'You are now connected to mongo!')
    .catch(err => console.error('Something went wrong', err))

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Use definition for express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', sassMiddleware);

app.use(cookieParser("PSZg88X]cu;U`vs<"));

// create the store for cookies id
const mongoStore = connectMongo(session)

// Create Session
app.use(session({
    secret: "PSZg88X]cu;U`vs<",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

//init i18n after cookie-parser
app.use(i18n.init);
// use the i18n
app.use(function(req, res, next) {
    res.i18n = i18n;
    req.i18n = i18n;
    next();
})

// Use path 
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