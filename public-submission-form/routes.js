const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')

router.get('/public-submission-form', function(request, response) {
    response.render('public-submission-form')
})

router.get('/public-submission-form-thank-you', function(request, response) {
    response.render('public-submission-form-thank-you')
})

router.post('/public-submission-form', getApiAccessToken, function(request, response) {
    let submission = {
        name: request.body.name,
    }
   superagent
        .post(uri + '/submissions')
        .type('form')
        .send(submission)
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/public-submission-form-thank-you')
        })
})

module.exports = router