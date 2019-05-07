var express = require('express');
var router = express.Router();
var lang_controller = require('../controllers/langController')

/* Route for changing language */
router.get('/:lang/*?', lang_controller.lang);

module.exports = router;