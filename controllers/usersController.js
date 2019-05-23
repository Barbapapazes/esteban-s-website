const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator/check')

// Require for models from DB
const User = require('../database/models/User')
const Role = require('../database/models/Role')

// Redirect to the dashbord
exports.index = (req, res, next) => {
    res.redirect('/users/dashbord')
}

// Display the dashbord
exports.dashbord = (req, res, next) => {
    res.json(req.session)
}

// Display the sign-in form
exports.signIn_get = (req, res, next) => {
    res.render('sign-in_form')
}

// Create new user
exports.signIn_post = [

    // Validate that the name field is not empty.
    body('name', 'Min: 3 characters').isLength({ min: 3 }).trim(),

    body('password')
    .matches(/^(?=.{6,})/).withMessage('min 6, max 20 char long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/).withMessage('Must contain one upper case and one lower case')
    .matches(/^(?=.*\d)/).withMessage('Must contain one digit')
    .matches(/^(?=.*[!@#\$%\^&\*])/).withMessage('Must contain one special char'),

    async(req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.send(errors.array())
        } else {
            // Data form is valid
            console.log(req.body)
            let member = await Role.find({ "role": 'member' })
            let user = new User({
                name: req.body.name,
                password: req.body.password,
                role: member[0]._id
            })
            user.save(function(err) {
                if (err) { return next(err) }
                res.send('successful')
            })
        }

    }
]

// Display the login page
exports.loginPage = (req, res) => {
    res.render('login_form')
}

// Login the user
exports.login = async(req, res) => {
    const { name, password } = req.body

    let result = {}
    let status = 200

    await User.findOne({ name }).populate('role').exec((err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    status = 200;
                    // Create a token
                    const payload = { user: user.name, role: user.role.role };
                    const options = { expiresIn: '2d', issuer: 'https://esteban-s-website.herokuapp.com' };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    //console.log('TOKEN', token);
                    result.token = token;
                    result.status = status;
                    result.result = user;
                    req.session.jwt = token
                    req.session.role = user.role.role
                    req.session.user = { name: user.name, id: user.id }
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
            })
        } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    })
}

// Logout user
exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/')
    })
}


// Display all users 
exports.getAll = (req, res, next) => {
    let result = {}
    let status = 200
    User.find({}, (err, users) => {
        if (!err) {
            result.status = status
            result.error = err
            result.result = users
            result.username = req.session.username
        } else {
            status = 500;
            result.status = status
            result.error = err
        }
        res.status(status).send(result)
    })
}