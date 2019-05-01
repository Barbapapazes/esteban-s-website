var express = require('express');
var router = express.Router();
var index_controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', index_controller.index);

/* Route for changing language */
router.get('/en', function(req, res) {
    res.cookie('i18n', 'en');
    res.redirect('/')
});

router.get('/fr', function(req, res) {
    res.cookie('i18n', 'fr');
    res.redirect('/')
});

module.exports = router;