const superagent = require('superagent')
const authData = require('../config/get-auth-data')

module.exports = function mustHaveTokenForServer(callback) {
    superagent
        .post('https://underwater.auth0.com/oauth/token')
        .send(authData)
        .end(function(error, data) {
            callback(data.body.access_token)
        })
}