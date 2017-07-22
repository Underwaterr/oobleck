const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')
const passport = require('passport')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')

router.get('/login', function(request, response) {
    response.render('login')
})

router.post('/login', getApiAccessToken, function(request, response, next) {
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: false
    })(request, response, next)
})

router.get('/user', mustBeLoggedIn, function(request, response) {
    response.render('user')
})

router.get('/logout', function(request, response){
    request.logout()
    response.redirect('/')
})


module.exports = router