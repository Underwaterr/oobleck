const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const superagent = require('superagent')
const uri = require('./get-uri')

var dummyUser = {id: 666, username: 'a', password: 'junk'}

module.exports = function(passport) {

    passport.use(new LocalStrategy(function(username, password, done) {

        superagent
            .get(uri + '/login')
            .send({ username: username, password: password })
            .type('form')
            //.set('Authorization', 'Bearer ' + request.access_token)
            .end(function(error, response) {
                if(error) return done(null, false, {message: 'somethin aint right'})
                if(response.message=="Login successful") return done(null, response)
            })

        /*
            if (username !== 'a') return done(null, false, {message: 'Wrong username'})
            if (password !== 'junk') return done(null, false, {message: 'Wrong password'})
            return done(null, dummyUser)
        */
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        done(null, dummyUser)
    })
}