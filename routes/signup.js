const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')

router.get('/signup', function(request, response) {
    response.render('signup')
})

router.post('/signup', getApiAccessToken, function(request, response) {
    let username = request.body.username
    let password = request.body.password
    superagent
        .post(uri + '/users')
        .type('form')
        .send({ username: username, password: password })
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403) response.render('error', data)
            response.json(data.body)
        })
})

module.exports = router