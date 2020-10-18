const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

module.exports = (dbUrl) => {
  console.log(dbUrl)
	return mongoose.createConnection(dbUrl, {
		useNewUrlParser: true
	})
}