let express = require('express')
let router = express.Router()
let superagent = require('superagent')

if (process.env.HEROKU) {
    let uri = 'http://oobleck-api.herokuapp.com/submissions'
}
else {
    let uri = 'http://localhost:3000/submissions'
}

// Homepage GET
router.get('/', (request, response) => {
    superagent
        .get(uri)
        .end(function(error, data) {
            if (error) {
                response.render('error', parseError(error))
            }
            else {
                let submissions = data.body
                response.render('index', { submissions: submissions })            
            }
        })
})

let parseError = function(error) {
    return {
        status: error.status,
        message: error.response.text
    }
}

module.exports = router