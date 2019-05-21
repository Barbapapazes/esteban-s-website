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

// GET create post page
router.get('/posts/create', validateToken.validateToken, projects_controller.post)

//POST a new post 
router.post('/posts/store', validateToken.validateToken, projects_controller.store_post)

// GET view post page
router.get('/post/:id', projects_controller.viewPost)

// GET create genre page
router.get('/genre/create', validateToken.validateToken, projects_controller.genre)

//POST a new genre: 
router.post('/genre/store', validateToken.validateToken, projects_controller.store_genre)

// GET view post page
router.get('/genre/:id', projects_controller.view_genre)

// GET view post page
router.get('/user/:id', projects_controller.view_userPosts)
module.exports = router;