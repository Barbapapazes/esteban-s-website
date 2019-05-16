const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')
const validateToken = require('../auth/utils')


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('not implemented')
});

// POST to add user
router.post('/add', usersController.add)

// GET & POST to login
router.get('/login', usersController.loginPage).post('/login', usersController.login)

// GET to logout
router.get('/logout', usersController.logout)

// GET request to see all users
router.get('/all', validateToken.validateToken, usersController.getAll)

module.exports = router;