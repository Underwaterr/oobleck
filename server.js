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

// The 'process.env.PORT' variable lets the port be set by Heroku
// If not set, use 8000!
let port = process.env.PORT || 8000;
app.listen(port, ()=> { console.log("Server ready! Listening on port " + port) })


// Super secret
if (process.env.HEROKU) {
	var NON_INTERACTIVE_CLIENT_ID = process.env.NON_INTERACTIVE_CLIENT_ID
	var NON_INTERACTIVE_CLIENT_SECRET = process.env.NON_INTERACTIVE_CLIENT_SECRET
}
else {
	try {
		let secret = require('./secret')
		var NON_INTERACTIVE_CLIENT_ID = secret.NON_INTERACTIVE_CLIENT_ID
		var NON_INTERACTIVE_CLIENT_SECRET = secret.NON_INTERACTIVE_CLIENT_SECRET
	}
	catch(e) {
		throw 'No auth keys found'
	}
}

console.log(NON_INTERACTIVE_CLIENT_SECRET, NON_INTERACTIVE_CLIENT_ID)

let authData = {
	client_id: NON_INTERACTIVE_CLIENT_ID,
	client_secret: NON_INTERACTIVE_CLIENT_SECRET,
	grant_type: 'client_credentials',
	audience: 'http://oobleck-api.herokuapp.com/'
}

function getAccessToken(request, response, next) {
	superagent
		.post('underwater.auth0.com/oauth/token')
		.send(authData)
		.end(function(error, response) {
			if(request.body.access_token) {
				res.send("SUCCESS!")
			}
			else {
				res.send(401, 'No thx :/')
			}
		})
}

app.get('/auth', getAccessToken, function(request, response) {
	res.send("Hello?")
})