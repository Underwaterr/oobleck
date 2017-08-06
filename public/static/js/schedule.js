Vue.component('day', {
    props: ['day', 'stages', 'events'],
    template: "#day-template"
})

Vue.component('stage', {
    props: ['stage', 'events'],
    template: '#stage-template'
})

Vue.component('event', {
    props: ['event'],
    template: "#event-template"
})

new Vue({
    el: "#app",
    data: getData(),
    methods: { 
        addEvent: addEvent,
        editEvent: editEvent
    }
})

function formatEvents() {
    var event = {
        time: '',
        stage: '',
        acts: []
    }

    var events = [ 
        {day: 'Tuesday',   stage: 'Hideout Upstairs', time: '8:00',  acts: ['PGraph', 'Midnight Society']},
        {day: 'Tuesday',   stage: 'ColdTowne',        time: '8:00',  acts: ['Channel 2', 'Frank Mills']},
        {day: 'Tuesday',   stage: 'ColdTowne',        time: '10:00', acts: ['Characters', 'Frank Mills']},
        {day: 'Wednesday', stage: 'ColdTowne',        time: '8:00',  acts: ['Camp sLaughter', 'Golden']},
        {day: 'Friday',    stage: 'Velveeta Room', time: '12:00',  acts: ['Katie Stone', 'Rob Gagnon']}
    ]

    var days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday']
    var stages = ['ColdTowne', 'Hideout Upstairs', 'Hideout Downstairs','The New Movement','Velveeta Room','Spider House Ballroom']
    
    var thing = []
    days.forEach((day)=> {
        thing[day] = {}
        stages.forEach((stage)=> {
            thing[day][stage] = events.filter((event) => { 
                return (event.day == day && event.stage == stage)
            })
        })
    })

    return {days: days, stages: stages, events: thing, event: event}
}

function getData() {
    return formatEvents()
}

function addEvent(event) {
    return null
}

function editEvent() {
    alert("WOO")
}