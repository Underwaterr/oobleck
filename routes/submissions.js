const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')

router.get('/submissions', getApiAccessToken, function(request, response) {
    superagent
        .get(uri + '/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403) response.render('error', data)
            response.render('submissions', { submissions: data.body })
        })
})

router.get('/new-submission', function(request, response) {
    response.render('new-submission')
})

module.exports = router