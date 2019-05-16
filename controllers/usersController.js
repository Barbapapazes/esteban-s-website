const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../database/models/User')

// create user
exports.add = function(req, res, next) {
    console.log(req.body)
    let user = new User({
        name: req.body.name,
        password: req.body.password
    })
    user.save(function(err) {
        if (err) { return next(err) }
        res.send('successful')
    })
}

exports.loginPage = (req, res) => {
    res.render('login', { i18n: res, langs: req.i18n.getLocales() });
}

// login
exports.login = (req, res) => {
    const { name, password } = req.body;


    let result = {};
    let status = 200;

    User.findOne({ name }, (err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    status = 200;
                    // Create a token
                    const payload = { user: user.name };
                    const options = { expiresIn: '2d', issuer: 'https://esteban-s-website.herokuapp.com' };
                    const secret = 'addjsonwebtokensecretherelikeQuiscustodietipsoscustodes';
                    const token = jwt.sign(payload, secret, options);

                    //console.log('TOKEN', token);
                    result.token = token;
                    result.status = status;
                    result.result = user;
                    req.session.jwt = token
                    req.session.username = user.name
                    res.redirect('/')
                } else {
                    status = 401;
                    result.status = status;
                    result.error = `Authentication error`;
                    res.status(status).send(result);
                }
            }).catch(err => {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            });
        } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/')
    })
}


// show all users 
exports.getAll = (req, res, next) => {
    let result = {}
    let status = 200
    User.find({}, (err, users) => {
        if (!err) {
            result.status = status;
            result.error = err;
            result.result = users;
            result.username = req.session.username
        } else {
            status = 500;
            result.status = status;
            result.error = err;
        }
        res.status(status).send(result);
    });
}