var express = require('express')
var router = express.Router()
var superagent = require('superagent')

// Homepage GET
router.get('/', (req, res) => {
    superagent
    .get('http://oobleck-api.herokuapp.com/submissions')
    .end(function(error, data) {
        var submissions = data.body

        var two = process.env.NON_INTERACTIVE_CLIENT_ID
        var three = process.env.NON_INTERACTIVE_CLIENT_SECRET

        res.render('index', { submissions: submissions, one: one, two: two })
    })
})

module.exports = router