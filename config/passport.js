const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const superagent = require('superagent')
const uri = require('./get-uri')

module.exports = function(passport) {

    passport.use(new LocalStrategy({ passReqToCallback: true }, function(request, username, password, done) {
        superagent
            .post(uri + '/login')
            .type('form')
            .send({ username: username, password: password })
            .set('Authorization', 'Bearer ' + request.access_token)
            .end(function(error, response) {
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