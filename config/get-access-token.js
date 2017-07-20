var superagent = require('superagent')
var authData = require('./authorization')

module.exports = function getAccessToken(request, response, next) {
    superagent
        .post('https://underwater.auth0.com/oauth/token')
        .send(authData)
        .end(function(error, data) {
            if(data.body.access_token) {
                request.access_token = data.body.access_token
                next()
            }
            else {
                response.status(401).send('Unauthorized')
            }
        })
}