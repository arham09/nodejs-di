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
      completed: value.completed,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt
    })

    data.save(err => {
      if (err) console.error(err)

      console.log('Data Sync')
    })
  }

  update (value, id) {
    const TaskQuery = this.container.get('TaskQueryModel')

    TaskQuery.updateOne({ originId: id }, value, (err, res) => {
      if (err) console.error(err)

      console.log(`Sycned ${res.ok} data`)
    })
  }

  delete (id) {
    const TaskQuery = this.container.get('TaskQueryModel')

    TaskQuery.deleteOne({ originId: id }, (err) => {
      if (err) console.error(err)

      console.log(`Data with following id ${id} is deleted`)
    })
  }

  next (data) {
    switch (data.action) {
      case 'create':
        return this.create(data.value)
      case 'update':
        return this.update(data.value, data.id)
      case 'delete':
        return this.delete(data.id)
      default:
        console.log('No Action')
    }
  }
}

module.exports = Subscriber