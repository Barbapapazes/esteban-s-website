// Change the lang using a cookie
exports.lang = function(req, res) {
    res.cookie('i18n', req.params.lang)
    if (req.params[0] == undefined)
        res.redirect("/")
    else
        res.redirect("/" + req.params[0])
}

// Prevent error
exports.index = function(req, res) {
    res.redirect("/")
}
exports.error = function(req, res) {
    res.cookie('i18n', req.params.lang)
    res.redirect("/")
}