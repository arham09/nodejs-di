const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const config = require('./config')
const container = require('./container')()

// App
const app = express()

// Container
container.register('dbUrl', config.mongoUrl)
container.factory('connection', require('./connection'))
container.factory('TaskModel', require('./schemas/task'))

// Task
const Task = container.get('TaskModel')

app.use(bodyParser.urlencoded({ extended: false })).use(jsonParser)

app.get('/tasks', (req, res) => {
	Task.find((err, tasks) => {
		if(err) {
			return res.sendStatus(400)
		}

		return res.json(tasks)
	});
});

app.listen(config.port, () => console.log("Listening on port ", config.port))

