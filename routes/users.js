const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const uri = require('../config/get-uri')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')
const mustBeRole = require('../utilities/must-be-role')
const mustHaveToken = require('../utilities/must-have-token')

router.get('/users', mustBeLoggedIn, mustBeRole(['admin']), mustHaveToken, function(request, response) {
    superagent
        .get(uri + '/users')
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('users', {users: data.body})
        })
})

router.get('/user/:id', mustBeLoggedIn, mustBeRole(['admin']), mustHaveToken, function(request, response) {
    const id = request.params.id
    superagent
        .get(uri + '/user/id/' + id)
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('user', data.body)
        })
})

router.get('/user/delete/:id', mustBeLoggedIn, mustHaveToken, function(request, response) {
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