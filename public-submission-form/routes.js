const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const uri = require('../config/get-uri')
const mustHaveToken = require('../utilities/must-have-token')

router.get('/public-submission-form', function(request, response) {
    response.render('public-submission-form')
})

router.get('/public-submission-form-thank-you', function(request, response) {
    response.render('public-submission-form-thank-you')
})

router.post('/public-submission-form', mustHaveToken, function(request, response) {
    let submission = {
        name: request.body.name,
        videoLinks: request.body.videoLinks
    }
   superagent
        .post(uri + '/submission')
        .type('form')
        .send(submission)
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            response.redirect('/public-submission-form-thank-you')
        })
})

module.exports = router