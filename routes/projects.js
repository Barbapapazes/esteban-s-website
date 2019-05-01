var express = require('express');
var router = express.Router();
var projects_controller = require('../controllers/projectsController')

/* GET home page. */
router.get('/', projects_controller.projects);

module.exports = router;