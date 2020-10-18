const { Sequelize } = require('sequelize')

module.exports = (pgUrl) => {
  const sequelize = new Sequelize(pgUrl, { logging: false })

  sequelize.sync().then(() => console.log('Synced')).catch(e => console.error(e))

  return sequelize
}