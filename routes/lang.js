var express = require('express');
var router = express.Router();
var lang_controller = require('../controllers/langController')

/* Route for changing language */
router.get('/:lang/*?', lang_controller.lang);

/* Prevent error */
router.get('/', lang_controller.index)
router.get('/:lang', lang_controller.error)

module.exports = router;