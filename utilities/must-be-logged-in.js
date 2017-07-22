module.exports = function mustBeLoggedIn(request, response, next) {
    let isAuthenticated = request.isAuthenticated()
    if(!isAuthenticated) {
        return response.render('error', {text: "Ya gotta be logged in!"} )
    }
    return next()
}