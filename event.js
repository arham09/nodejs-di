class Subscriber {
  constructor(container) {
    this.container = container
  }

  next (value) {
    console.log(value)
    const TaskQuery = this.container.get('TaskQueryModel')
    console.log(TaskQuery)
  }
}

module.exports = Subscriber