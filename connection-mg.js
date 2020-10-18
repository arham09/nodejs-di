const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

module.exports = (mongoUrl) => {
	return mongoose.createConnection(mongoUrl, {
		useNewUrlParser: true
	})
}