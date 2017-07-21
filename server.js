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

// Add Routes
let routes = require('./routes')
app.use('/', routes)

// The 'PORT' environment variable is set by Heroku
let port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })

/*
const passport = require('passport')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
app.use(session({secret: "ilovecakes"}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('./protected-routes')(app, passport)
*/