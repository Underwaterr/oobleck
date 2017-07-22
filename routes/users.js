const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const uri = require('../config/get-uri')

router.get('/users', function(request, response) {
    superagent
        .get(uri + '/users')
        //.set('Authorization', 'Bearer ' + request.access_token)
        .type('form')
        .end(function(error, data) {
            response.render('users', {users: data.body})
        })
})

module.exports = router