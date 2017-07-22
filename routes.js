const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('./config/get-api-access-token')
const uri = require('./config/get-uri')

const signup = require('./routes/signup')
const login = require('./routes/login')
const users = require('./routes/users')
const submissions = require('./routes/submissions')
router.use(signup)
router.use(login)
router.use(users)
router.use(submissions)

// Error handler
router.use(function(error, request, response, next) {
    console.log("Error Found", error)
    response.status(error.statusCode || 500).json(error);
})

// Home page
router.get('/', function(request, response) {
    response.render('index')
})

module.exports = router