var express = require('express');
var router = express.Router();

var about_controller = require('../controllers/aboutController')

/* GET about listing. */
router.get('/', about_controller.about);

/* GET me listing. */
router.get('/me', about_controller.me);

module.exports = router;