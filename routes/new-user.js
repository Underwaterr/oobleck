const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')

router.get('/new-user', mustBeLoggedIn, function(request, response) {
    response.render('new-user')
})

router.post('/new-user', getApiAccessToken, function(request, response) {
    let username = request.body.username
    let password = request.body.password
    let role     = request.body.role
    superagent
        .post(uri + '/users')
        .type('form')
        .send({ username: username, password: password, role: role })
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/users')
        })
})

module.exports = router