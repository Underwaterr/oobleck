const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('./config/get-api-access-token')
const uri = require('./config/get-uri')

const signup = require('./routes/signup')
const login = require('./routes/login')
const users = require('./routes/users')
router.use(signup)
router.use(login)
router.use(users)

// Error handler
router.use(function(error, request, response, next) {
    console.log("Error Found", error)
    response.status(error.statusCode || 500).json(error);
})

router.get('/', function(request, response) {
    response.render('index')
})

router.get('/submissions', getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403) response.render('error', data)
            response.render('submissions', { submissions: data.body })
        })
})

module.exports = router