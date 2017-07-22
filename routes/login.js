const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')
const passport = require('passport')

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

router.get('/user', function(request, response) {
    // Request & Response are empty?
    response.render('user')
})

router.get('/boo', function(request, response) {
    response.send("BOO!")
})


module.exports = router