const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const uri = require('../config/get-uri')
const mustBeLoggedIn = require('../utilities/must-be-logged-in')
const mustHaveToken = require('../utilities/must-have-token')
const passport = require('passport')

router.get('/login', function(request, response) {
    response.render('login')
})

router.post('/login', mustHaveToken, function(request, response, next) {
    passport.authenticate('local', {
        successRedirect: '/login-successful',
        failureRedirect: '/login',
        failureFlash: false
    })(request, response, next)
})

router.get('/login-successful', mustBeLoggedIn, function(request, response) {
    response.render('login-successful')
})

router.get('/logout', function(request, response){
    request.logout()
    response.redirect('/')
})


module.exports = router