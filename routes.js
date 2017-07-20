const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('./config/get-api-access-token')

var uri
if(process.env.HEROKU) {
    uri = 'oobleck-api.herokuapp.com'
}
else {
    uri = 'localhost:3000'
}

router.get('/', function(request, response) {
    response.render('index')
})

router.get('/submissions', getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403){
                response.status(403).send('403 Forbidden') } 
            else {
                response.render('submissions', { submissions: data.body })
            }
        })
})

router.get('/signup', function(request, response) {
    response.render('signup')
})

router.post('/signup', /*getApiAccessToken,*/ function(request, response) {
    console.log(request.body)
    superagent
        .post(uri + '/users')
        .send({ username: request.body.username, password: request.body.password }) // sends a JSON post body
        //.set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.send("YOU DID IT!")
        })
})

module.exports = router