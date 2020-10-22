const express = require('express')
const { Subject, async } = require('rxjs')
const bodyParser = require('body-parser')
const Subscriber = require('./event')
const jsonParser = bodyParser.json()
const config = require('./config')
const container = require('./container')()

// App
const subject = new Subject()
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

// Event
const subscriber = new Subscriber(container)
subject.subscribe(subscriber)

app.use(bodyParser.urlencoded({ extended: false })).use(jsonParser)

app.get('/tasks', (req, res) => {
	TaskQuery.find((err, tasks) => {
		if(err) {
			return res.sendStatus(400)
		}

		return res.json(tasks)
	})
})

app.get('/tasks/:id', (req, res) => {
	TaskQuery.find({ originId: req.params.id }, (err, tasks) => {
		if(err) {
			return res.sendStatus(400)
		}

		return res.json(tasks[0])
	})
})

app.post('/tasks', async (req, res) => {
	try {
		const task = await TaskCommand.create({
			name: req.body.name,
			description: req.body.description,
			completed: req.body.completed,
			createdAt: new Date(),
			updatedAt: new Date()
		})

		subject.next({ action: 'create', value: task.toJSON()})

		return res.json(task)
	} catch (error) {
		return res.json(error)
	}
})

app.patch('/tasks/:id', async (req, res) => {
	try {
		const data = {
			updatedAt: new Date()
		}

		for (const [key, val] of Object.entries(req.body)) {
			data[key] = val
		}

		const task = await TaskCommand.update(data, { where: { id: req.params.id } })

		if (task[0] === 0) return res.sendStatus(404)

		subject.next({ action: 'update', value: data, id: req.params.id })

		return res.json({ message: 'Data Updated' })
	} catch (error) {
		return res.json(error)
	}
})

app.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await TaskCommand.destroy({ where: { id: req.params.id } })

		if (task === 0) return res.sendStatus(404)

		subject.next({ action: 'delete', id: req.params.id })

		return res.json({ message: 'Data Deleted' })
	} catch (error) {
		return res.json(error)
	}
})

app.listen(config.port, () => console.log("Listening on port ", config.port))

