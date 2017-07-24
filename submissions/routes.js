const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const uri = require('../config/get-uri')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')
const mustBeRole = require('../utilities/must-be-role')
const mustHaveToken = require('../utilities/must-have-token')

router.get('/submissions', mustBeLoggedIn, mustBeRole(['admin', 'reviewer']), mustHaveToken, function(request, response) {
    superagent
        .get(uri + '/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('submissions', { submissions: data.body })
        })
})

router.get('/submission/:id', mustBeLoggedIn, mustBeRole(['admin', 'reviewer']), mustHaveToken, function(request, response) {
    const id = request.params.id
    superagent
        .get(uri + '/submission/' + id)
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.render('submission', data.body)
        })

})

router.get('/submission/delete/:id', mustBeLoggedIn, mustBeRole(['admin']), mustHaveToken, function(request, response) {
    const id = request.params.id
    superagent
        .delete(uri + '/submission/' + id)
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/submissions')
        })
})

router.post('/review/:submissionId', mustBeLoggedIn, mustBeRole('reviewer'), mustHaveToken, function(request, response) {
    const submissionId = request.params.submissionId
    const review = { 
        userId: request.user._id,
        score: request.body.score, 
        notes: request.body.notes 
    }
    superagent
        .post(uri + '/review/' + submissionId)
        .type('form')
        .send(review)
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/submissions')
        })
})

module.exports = router