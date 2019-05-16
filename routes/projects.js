var express = require('express');
var router = express.Router();

// Require controller modules
var projects_controller = require('../controllers/projectsController')
const validateToken = require('../auth/utils')

/// PROJECTS ROUTES ///

// GET projects home page
router.get('/', projects_controller.projects)

// GET all projects
router.get('/all', projects_controller.getAll)

// GET create page
router.get('/posts/create', validateToken.validateToken, projects_controller.create)

//POST a new position: 
router.post('/posts/store', validateToken.validateToken, projects_controller.store)

// GET view post page
router.get('/post/:id', projects_controller.viewPost)

module.exports = router;