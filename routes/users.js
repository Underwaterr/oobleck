const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')
const mustBeRole = require('../utilities/must-be-role')
const getApiAccessToken = require('../config/get-api-access-token')

const uri = require('../config/get-uri')

router.get('/users', mustBeLoggedIn, mustBeRole(['admin']), getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/users')
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('users', {users: data.body})
        })
})

router.get('/user/delete/:id', mustBeLoggedIn, getApiAccessToken, function(request, response) {
    const id = request.params.id
    superagent
        .delete(uri + '/users/' + id)
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/users')
        })
})

module.exports = router