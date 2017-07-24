// Set "isLoggedIn" boolean to response.local
module.exports = function(request, response, next) {
    if (typeof request.isAuthenticated == 'function') { 
        // 'isAuthenticated()' is undocumented Passport.js function
        let isLoggedIn = request.isAuthenticated()
        response.locals.isLoggedIn = isLoggedIn
        if (isLoggedIn) {
            let id = request.user._id
            let username = request.user.username 
            let role = request.user.role
            response.locals.user = {
                id: id,
                username: username,
                role: role
            }
            // Used by Pug templates
            response.locals.userHasRole = function(roles) { 
                if (typeof roles == 'string') roles = [roles]
                return roles.includes(role)
            }
        }
        else {
            response.locals.userHasRole = function() { return false }
        }
    }
    else {
        response.locals.isLoggedIn = false
        response.locals.user = null
        //response.locals.userHasRole = function() { return false } Maybe I don't need this!
    }
    next()
}