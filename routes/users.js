const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')
const uri = require('../config/get-uri')

router.get('/users', mustBeLoggedIn, getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/users')
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('users', {users: data.body})
        })
})

module.exports = router