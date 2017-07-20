let express = require('express')
let bodyParser = require('body-parser')   // https://github.com/expressjs/body-parser
let app = express()
let superagent = require('superagent')

// Setup how to render pages
app.set('views', './public')                        // Find the views in the 'public' folder!
app.set('view engine', 'pug')                       // Use PUG as our view engine
app.use(bodyParser.urlencoded({extended: true}))    // For... parsing?
app.use(express.static('public'))                   // Static file location

// Add Routes
let routes = require('./routes')
app.use('/', routes)

// The 'PORT' environment variable is set by Heroku
let port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })

var getAccessToken = require('./config/get-access-token')

app.get('/auth', getAccessToken, function(request, response) {
    superagent
        .get('oobleck-api.herokuapp.com/submissions')
        .set('Authorization', 'Bearer ' + request.access_token)
        .end(function(error, data) {
            if(data.status == 403){
                response.status(403).send('403 Forbidden') } 
            else {
                response.render('index', { submissions: data.body })
            }
        })
})