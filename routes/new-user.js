const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')

router.get('/new-user', function(request, response) {
    response.render('new-user')
})

router.post('/new-user', getApiAccessToken, function(request, response) {
    let username = request.body.username
    let password = request.body.password
    superagent
        .post(uri + '/users')
        .type('form')
        .send({ username: username, password: password })
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403) response.render('error', data)
            response.redirect(/users)
        })
})

module.exports = router