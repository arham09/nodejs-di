class Subscriber {
  constructor(container) {
    this.container = container
  }

  next (value) {
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
}

module.exports = Subscriber