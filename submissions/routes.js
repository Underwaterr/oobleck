const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')
const mustBeRole = require('../utilities/must-be-role')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')

router.get('/submissions', mustBeLoggedIn, mustBeRole(['admin', 'reviewer']), getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('submissions', { submissions: data.body })
        })
})

router.get('/submission/delete/:id', mustBeLoggedIn, mustBeRole(['admin']), getApiAccessToken, function(request, response) {
    const id = request.params.id
    superagent
        .delete(uri + '/submissions/' + id)
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/submissions')
        })
})

module.exports = router