class Subscriber {
  constructor(container) {
    this.container = container
  }

  create (value) {
    const TaskQuery = this.container.get('TaskQueryModel')
    
    const data = new TaskQuery({
      originId: value.id,
      name: value.name,
      description: value.description,
      completed: value.completed
    })

    data.save(err => {
      if (err) console.error(err)

      console.log('Data Sync')
    })
  }

  update (value, id) {
    const TaskQuery = this.container.get('TaskQueryModel')

    const data = {}

		for (const [key, val] of Object.entries(value)) {
			data[key] = val
		}

    TaskQuery.updateOne({ originId: id }, value, (err, res) => {
      if (err) console.error(err)

      console.log(`Sycned ${res.ok} data`)
    })
  }

  next (data) {
    if (data.action === 'create') this.create(data.value)

    if (data.action === 'update') this.update(data.value, data.id)
  }
}

module.exports = Subscriber