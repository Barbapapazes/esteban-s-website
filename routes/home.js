var express = require('express');
var router = express.Router();

// Require controller modules
var home_controller = require('../controllers/homeController')

/// HOME ROUTES ///

// GET request to the home page
router.get('/', home_controller.home);

module.exports = router;