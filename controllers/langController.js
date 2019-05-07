// Change the lang using a cookie
exports.lang = function(req, res) {
    res.cookie('i18n', req.params.lang)
    res.redirect("/" + req.params[0])
}