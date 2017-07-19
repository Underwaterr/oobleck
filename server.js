let express = require('express')
let bodyParser = require('body-parser')   // https://github.com/expressjs/body-parser
let app = express()

// Setup how to render pages
app.set('views', './public')                        // Find the views in the 'public' folder!
app.set('view engine', 'pug')                       // Use PUG as our view engine
app.use(bodyParser.urlencoded({extended: true}))    // For... parsing?
app.use(express.static('public'))                   // Static file location

// Add Routes
let routes = require('./routes')
app.use('/', routes)

// The 'process.env.PORT' variable lets the port be set by Heroku
// If not set, use 8000!
let port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })

// Super secret
let NON_INTERACTIVE_CLIENT_ID = process.env.NON_INTERACTIVE_CLIENT_ID
let NON_INTERACTIVE_CLIENT_SECRET = process.env.NON_INTERACTIVE_CLIENT_SECRET