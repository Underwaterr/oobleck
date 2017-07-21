module.exports = process.env.HEROKU 
    ? 'oobleck-api.herokuapp.com'
    : 'localhost:3000'