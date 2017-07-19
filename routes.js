var express = require('express')
var router = express.Router()
var superagent = require('superagent')

// Homepage GET
router.get('/', (req, res) => {
    superagent
    .get('http://oobleck-api.herokuapp.com/submissions')
    .end(function(error, data) {
        var submissions = data.body
        res.render('index', { submissions: submissions })
    })
})



module.exports = router

