const capitalize = require('capitalize')

// Set "isLoggedIn" boolean to response.local
module.exports = function(request, response, next) {
    if (typeof request.isAuthenticated == 'function') { 
        // 'isAuthenticated()' is undocumented Passport.js function
        let isLoggedIn = request.isAuthenticated()
        response.locals.isLoggedIn = isLoggedIn
        if (isLoggedIn) {
            response.locals.user = {
                username: request.user.username,
                role: request.user.role
            }
        }
    }
    else {
        response.locals.isLoggedIn = false
        response.locals.user = null
    }
    next()
}