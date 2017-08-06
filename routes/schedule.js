const express = require('express')
const router = express.Router()
const superagent = require('superagent')
const uri = require('../config/get-uri')
const mustHaveToken = require('../utilities/must-have-token')

router.get('/schedule', function(request, response) {
    let days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
    let stages = ['ColdTowne', 'Hideout Upstairs', 'Hideout Downstairs','The New Movement','Velveeta Room','Spider House Ballroom']
    let acts = [ 'PGraph', 'Midnight Society', 'Frank Mills', 'Movie Riot']
    
    response.render('schedule', { days: days, stages: stages, acts: acts })
})

router.get('/schedule-old', mustHaveToken, function(request, response) {
    let acts = [ 'PGraph', 'Midnight Society', 'Frank Mills', 'Movie Riot']
    let events = [
        {day: 'Tuesday',    time: '8:00',   stage: 0, acts: ['PGraph', 'Frank Mills']},
        {day: 'Tuesday',    time: '10:00',  stage: 0, acts: ['Midnight Society', 'Knuckleball Now']},
        {day: 'Tuesday',    time: '10:00',  stage: 1, acts: ['Camp sLaughter', 'Golden']},
        {day: 'Wednesday',  time: '10:00',  stage: 4, acts: ['Curtis Needs a Ride']},
        {day: 'Thursday',   time: '8:30',   stage: 2, acts: ['Martini Ranch'], name: "LGBTQ Showcase"},
    ]

    let viewData = {
        days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
        stages: ['ColdTowne', 'Hideout Upstairs', 'Hideout Downstairs','The New Movement','Velveeta Room','Spider House Ballroom'],
        acts: acts,
        events: events
    }
    response.render('schedule-old', viewData)
})

module.exports = router