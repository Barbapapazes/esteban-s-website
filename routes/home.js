var express = require('express');
var router = express.Router();
var home_controller = require('../controllers/homeController')

router.get('/', home_controller.home);

module.exports = router;