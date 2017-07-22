const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')

router.get('/users', getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/users')
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403) response.render('error', data)
            response.render('users', {users: data.body})
        })
})

module.exports = router