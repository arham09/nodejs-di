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
    switch (data.action) {
      case 'create':
        return this.create(data.value)
      case 'update':
        return this.update(data.value, data.id)
    }
  }
}

module.exports = Subscriber