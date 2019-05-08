var express = require('express');
var router = express.Router();

// Require controller modules
var about_controller = require('../controllers/aboutController')

/// ABOUT ROUTES ///

// GET about home page
router.get('/', about_controller.about);

// GET request to the creator page
router.get('/me', about_controller.me);

module.exports = router;