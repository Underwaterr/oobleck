const superagent = require('superagent')
const authData = require('../config/get-auth-data')

module.exports = function(request, response, next) {
    superagent
        .post('https://underwater.auth0.com/oauth/token')
        .send(authData)
        .end(function(error, data) {
            if(data.body.access_token) {
                request.access_token = data.body.access_token
                next()
            }
            else {
                return response.status(401).render('error', {text: 'API authentication failed'})
            }
        })
}