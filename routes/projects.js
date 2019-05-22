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

/// POSTS INSTANCES ROUTES ///

// GET create post
router.get('/post/create', validateToken.validateToken, projects_controller.create_post)

// POST new post 
router.post('/post/store', validateToken.validateToken, projects_controller.store_post)

// GET view post page
router.get('/post/:id', projects_controller.view_post)

/// GENRES ROUTES ///

// GET create genre
router.get('/genre/create', validateToken.validateToken, projects_controller.create_genre)

// POST new genre
router.post('/genre/store', validateToken.validateToken, projects_controller.store_genre)

// GET view post, using the genre filter
router.get('/genre/:id', projects_controller.view_genre_posts)

/// USERS ROUTES ///

// GET view post, using the user filter
router.get('/user/:id', projects_controller.view_user_posts)

module.exports = router;