const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const superagent = require('superagent')
const uri = require('./get-uri')

var dummyUser = {id: 666, username: 'a', password: 'junk'}

module.exports = function(passport) {

    passport.use(new LocalStrategy(function(username, password, done) {
        superagent
            .post(uri + '/login')
            .send({ username: username, password: password })
            .type('form')
            //.set('Authorization', 'Bearer ' + request.access_token)
            .end(function(error, response) {
                console.log("Results ", response.body)
                //if(error) return done(null, false, {message: 'somethin aint right'})
                //if(response.message=="Login successful") return done(null, response)
                return done(null, response.body.result)
            })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(user, done) {
        done(null, user)
    })
}