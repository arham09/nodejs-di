const { Sequelize } = require('sequelize')

module.exports = (pgUrl) => {
  return new Sequelize(pgUrl)
}