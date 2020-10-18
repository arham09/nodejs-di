const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const config = require('./config')
const container = require('./container')()

// App
const app = express()

// Regoster Dep
container.register('mongoUrl', config.mongoUrl)
container.register('pgUrl', config.pgUrl)

// Query
container.factory('mongoose', require('./connection-mg'))
container.factory('TaskQueryModel', require('./schemas/task-mg'))

// Command
container.factory('sequelize', require('./connection-pg'))
container.factory('TaskCommandModel', require('./schemas/task-pg'))

// Task Query
const TaskQuery = container.get('TaskQueryModel')
const TaskCommand = container.get('TaskCommandModel')

app.use(bodyParser.urlencoded({ extended: false })).use(jsonParser)

app.get('/tasks', (req, res) => {
	TaskQuery.find((err, tasks) => {
		if(err) {
			return res.sendStatus(400)
		}

		return res.json(tasks)
	});
});

app.listen(config.port, () => console.log("Listening on port ", config.port))

