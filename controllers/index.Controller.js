// GET Index 
exports.index = function(req, res, next) {
    res.render('index', { title: 'Estéban\'s Website', i18n: res });
}