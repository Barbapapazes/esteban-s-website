var express = require('express');
var router = express.Router();

// Require controller modules
var projects_controller = require('../controllers/projectsController')

/// PROJECTS ROUTES ///

// GET projects home page
router.get('/', projects_controller.projects);

// GET create page
router.get('/posts/create', projects_controller.create)

//POST a new position: 
router.post('/posts/store', projects_controller.store)

module.exports = router;