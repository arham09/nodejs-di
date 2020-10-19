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

  next (data) {
    if (data.action === 'create') this.create(data.value)
  }
}

module.exports = Subscriber