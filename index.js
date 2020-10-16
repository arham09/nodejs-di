const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const config = require('./config')
const TaskSchema = require('./schemas/task')

// App
const app = express()

// Factories
const dbConnectionFactory = require('./connection')
const modelFactory = require('./model')

// Instance
const connection = dbConnectionFactory(config.mongoUrl)
const Task = modelFactory(connection, 'Task', TaskSchema)

app.use(bodyParser.urlencoded({ extended: false })).use(jsonParser)

app.get('/tasks', (req, res) => {
	Task.find((err, tasks) => {
		if(err) {
			return res.sendStatus(400)
		}

		return res.json(tasks)
	});
});

app.listen(port, () => console.log("Listening on port ", config.port))

