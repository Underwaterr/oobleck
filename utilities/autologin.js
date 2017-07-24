const superagent = require('superagent')
const uri = require('../config/get-uri')
const mustHaveToken = require('../utilities/must-have-token-for-server')

module.exports = function () {
    mustHaveToken(function(token) {    
        superagent
            .post(uri + '/login')
            .type('form')
            .send({ username: 'fun', password: 'fun' })
            .set('Authorization', 'Bearer ' + token)
            .end(function(error, data) {
                console.log("Nothing matters.")
            })
    })
}