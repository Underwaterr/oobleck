const express = require('express')
const app = express()

// Setup how to render pages
const bodyParser = require('body-parser')
app.set('views', './public/views')                  // Find the views in the 'public' folder!
app.set('view engine', 'pug')                       // Use PUG as our view engine
app.use(bodyParser.urlencoded({extended: true}))    // For... parsing?
app.use(bodyParser.json())                          // & JSON!
app.use(express.static('public/static'))            // Static file location

// Passportin'
const session = require('express-session');
const passport = require('passport')
app.use(session({secret: "I think Donnie Darko is overrated"}));
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// Check user ever tim
const setLoginStatus = require('./utilities/set-login-status')
app.use(setLoginStatus)

// Add Routes
let routes = require('./routes')
app.use('/', routes)

// The 'PORT' environment variable is set by Heroku
let port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })

// login automatically
const autologin = require('./utilities/autologin')
autologin() // y u no work???//