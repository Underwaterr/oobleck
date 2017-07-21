const express = require('express')
const bodyParser = require('body-parser')   // https://github.com/expressjs/body-parser
const app = express()
const superagent = require('superagent')

// Setup how to render pages
app.set('views', './public')                        // Find the views in the 'public' folder!
app.set('view engine', 'pug')                       // Use PUG as our view engine
app.use(bodyParser.urlencoded({extended: true}))    // For... parsing?
app.use(bodyParser.json())                          // & JSON!
app.use(express.static('public'))                   // Static file location

// Passportin'
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// Add Routes
let routes = require('./routes')
app.use('/', routes)

// The 'PORT' environment variable is set by Heroku
let port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })

