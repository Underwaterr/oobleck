module.exports = function mustBeLoggedIn(request, response, next) {
    let isLoggedIn = request.isAuthenticated()
    if(!isLoggedIn) {
        return response.render('error', {text: "Ya gotta be logged in!"} )
    }
    return next()
}