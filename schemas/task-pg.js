const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  console.log(sequelize)
  const Task = sequelize.define('tasks', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    completed: {
      type: DataTypes.STRING(55),
      allowNull: false
    }
  })

  return Task
}