const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('../config/get-api-access-token')
const uri = require('../config/get-uri')
const passport = require('passport')

router.get('/login', function(request, response) {
    response.render('login')
})

router.post('/login', function(request, response, next) {
    let username = request.body.username
    let password = request.body.password
    passport.authenticate('local', {
        successRedirect: '/yay',
        failureRedirect: '/boo',
        failureFlash: true
    })(request, response, next)
})

router.get('/yay', function(request, response) {
    response.send("YAY!")
})
router.get('/boo', function(request, response) {
    response.send("BOO!")
})


module.exports = router