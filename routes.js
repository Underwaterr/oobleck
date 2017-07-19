let express = require('express')
let router = express.Router()
let superagent = require('superagent')

let outside = 'http://oobleck-api.herokuapp.com/submissions'
let inside  = 'http://localhost:3000/submissions'

// Homepage GET
router.get('/', (request, response) => {
    superagent
    .get(inside)
    .end(function(error, data) {
        if (error) {
            //response.render('error', {error: error })
            response.json(error)
        }
        else {
            let submissions = data.body
            response.render('index', { submissions: submissions })            
        }
    })
})

module.exports = router