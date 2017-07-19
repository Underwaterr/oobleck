fetch('http://oobleck-api.herokuapp.com/submissions')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        console.log(data)
    })