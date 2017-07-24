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

module.exports = {
    client_id: NON_INTERACTIVE_CLIENT_ID,
    client_secret: NON_INTERACTIVE_CLIENT_SECRET,
    audience: 'http://oobleck-api.herokuapp.com/',
    grant_type: 'client_credentials'
}