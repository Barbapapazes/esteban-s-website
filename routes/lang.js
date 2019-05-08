var express = require('express');
var router = express.Router();

// Require controller modules
var lang_controller = require('../controllers/langController')

/// LANG ROUTES ///

// GET lang home page
router.get('/', lang_controller.index)

// GET request to change language and return to /home page
router.get('/:lang', lang_controller.langHome)

// GET request to change language but stay on the same page
router.get('/:lang/*?', lang_controller.langStay);


module.exports = router;