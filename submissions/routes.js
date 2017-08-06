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
            let sortedSubmissions = data.body.sort((a, b)=> {return a.name.localeCompare(b.name)})

            let userRole = response.locals.user.role

            if (userRole == 'reviewer') {
                var userId = response.locals.user.id
                var scoreDistribution = [0, 0, 0, 0, 0, 0]
                var numberOfSubmissionsUserReviewed = 0
                sortedSubmissions.forEach(function(submission) {
                    if (submission.reviews[userId] !== undefined) {
                        scoreDistribution[submission.reviews[userId].score]++
                        numberOfSubmissionsUserReviewed++
                    }
                    else
                        scoreDistribution[5]++
                })
                var totalNumberOfSubmissions = sortedSubmissions.length
                var percentProgress = (numberOfSubmissionsUserReviewed / totalNumberOfSubmissions) * 100                
            }
            else if (userRole == 'admin') {
                var scoreDistribution = null
                var totalNumberOfSubmissions = sortedSubmissions.length
                var percentProgress = 50;
            }

            response.render('submissions', { submissions: sortedSubmissions, scoreDistribution: scoreDistribution, percentProgress: percentProgress})
        })
})

router.get('/submission/:id', mustBeLoggedIn, mustBeRole(['admin', 'reviewer']), mustHaveToken, function(request, response) {
    const id = request.params.id
    superagent
        .get(uri + '/submission/' + id)
        .type('form')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            let submission = data.body
            let userId = response.locals.user.id
            submission.review = submission.reviews[userId] == undefined 
                ? {score: null, notes: ''}
                : submission.reviews[userId]
            response.render('submission', submission)
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
        username: request.user.username,
        score:  request.body.score, 
        notes:  request.body.notes 
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