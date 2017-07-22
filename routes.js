const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('./config/get-api-access-token')
const uri = require('./config/get-uri')

const newUserRoutes = require('./routes/new-user')
const loginRoutes = require('./routes/login')
const usersRoutes = require('./routes/users')
const submissionsRoutes = require('./routes/submissions')
router.use(newUserRoutes)
router.use(loginRoutes)
router.use(usersRoutes)
router.use(submissionsRoutes)

// Error handler
router.use(function(error, request, response, next) {
    console.log("Error Found", error)
    next()//response.status(error.statusCode || 500).json(error);
})

// Home page
router.get('/', function(request, response) {
    response.render('index')
})

module.exports = router