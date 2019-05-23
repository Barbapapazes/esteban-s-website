const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController')
const validateToken = require('../auth/utils')
const redirectIfAuthenticated = require('../middlewares/redirectIfAuthenticated')

/// USERS ROUTES ///

// GET dashbord of a user
router.get('/', validateToken.validateToken, usersController.dashbord);

// GET request to see all users
router.get('/all', validateToken.validateToken, usersController.getAll)

// GET & POST add user
router
    .get('/sign-in', redirectIfAuthenticated, usersController.signIn_get)
    .post('/sign-in', redirectIfAuthenticated, usersController.signIn_post)

// GET & POST to login
router.get('/login', redirectIfAuthenticated, usersController.loginPage)
    .post('/login', redirectIfAuthenticated, usersController.login)

// GET to logout
router.get('/logout', usersController.logout)

module.exports = router