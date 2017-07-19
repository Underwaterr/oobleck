const express = require('express')
const bodyParser = require('body-parser')   // https://github.com/expressjs/body-parser
const app = express()

// Setup how to render pages
app.set('views', './public')                        // Find the views in the 'public' folder!
app.set('view engine', 'pug')                       // Use PUG as our view engine
app.use(bodyParser.urlencoded({extended: true}))    // For... parsing?
app.use(express.static('public'))                   // Static file location

// Add Routes
const routes = require('./routes')
app.use('/', routes)

// The 'process.env.PORT' variable lets the port be set by Heroku
// If not set, use 8000!
const port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })