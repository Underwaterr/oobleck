module.exports = function mustBeRole(roles) {
    return function (request, response, next) {
        let userRole = request.user.role
        let userHasPermission = roles.includes(userRole)
        if (!userHasPermission) {
            return response.render('error', {text: "Role mis-match brahh"} )
        }
        next()
    }
}