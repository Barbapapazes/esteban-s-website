var express = require('express');
var router = express.Router();

// Require controller modules
var projects_controller = require('../controllers/projectsController')

/// PROJECTS ROUTES ///

// GET projects home page
router.get('/', projects_controller.projects);

module.exports = router;