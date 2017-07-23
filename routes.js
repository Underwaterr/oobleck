const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const getApiAccessToken = require('./config/get-api-access-token')
const uri = require('./config/get-uri')

router.use(require('./routes/new-user'))
router.use(require('./routes/login'))
router.use(require('./routes/users'))
router.use(require('./submissions/routes'))
router.use(require('./public-submission-form/routes'))

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