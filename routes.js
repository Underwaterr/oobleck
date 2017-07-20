let express = require('express')
let router = express.Router()
let superagent = require('superagent')

var getAccessToken = require('./config/get-access-token')

router.get('/', getAccessToken, function(request, response) {
    superagent
        .get('oobleck-api.herokuapp.com/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403){
                response.status(403).send('403 Forbidden') } 
            else {
                response.render('index', { submissions: data.body })
            }
        })
})

module.exports = router