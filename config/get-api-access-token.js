const superagent = require('superagent')

// Super secret
if (process.env.HEROKU) {
    var NON_INTERACTIVE_CLIENT_ID = process.env.NON_INTERACTIVE_CLIENT_ID
    var NON_INTERACTIVE_CLIENT_SECRET = process.env.NON_INTERACTIVE_CLIENT_SECRET
}
else {
    try {
        let secret = require('../secret')
        var NON_INTERACTIVE_CLIENT_ID = secret.NON_INTERACTIVE_CLIENT_ID
        var NON_INTERACTIVE_CLIENT_SECRET = secret.NON_INTERACTIVE_CLIENT_SECRET
    }
    catch(e) {
        throw 'No auth keys found'
    }
}

const authData = {
    client_id: NON_INTERACTIVE_CLIENT_ID,
    client_secret: NON_INTERACTIVE_CLIENT_SECRET,
    audience: 'http://oobleck-api.herokuapp.com/',
    grant_type: 'client_credentials'
}

module.exports = function getApiAccessToken(request, response, next) {
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