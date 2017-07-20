module.exports = function(app, passport) {
    app.get('/profile', isLoggedIn, function(request, response) {
        response.send("Yahoo!")
    })



    app.get('/login', function(request, response) {
        response.render('login')
    })

    app.get('/logout', function(request, response) {
        request.logout()
        response.send("Womp womp")
    })
}

function isLoggedIn(request, response, next) {
    if (request.isAuthenticated())
        return next()

    response.send("Boooo")
}