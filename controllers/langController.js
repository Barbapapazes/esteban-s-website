// Show available languages
exports.index = function(req, res) {
    res.render('lang', { i18n: res, langs: req.i18n.getLocales() });
}

// Change language and return to /home
exports.langHome = function(req, res) {
    res.cookie('i18n', req.params.lang)
    res.redirect("/")
}

// Change language
exports.langStay = function(req, res) {
    res.cookie('i18n', req.params.lang)
    if (req.params[0] == undefined)
        res.redirect("/")
    else
        res.redirect("/" + req.params[0])
}