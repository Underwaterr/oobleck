module.exports = process.env.HEROKU 
    ? 'http://oobleck-api.herokuapp.com'
    : 'http://localhost:3000'