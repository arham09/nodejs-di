const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
	originId: {
		type: Number,
		unique: false,
		required: true
	},
	name: {
		type: String,
		unique: false,
		required: true
	},
	description: {
		type: String,
		unique: false,
		required: false
	},
	completed: {
		type: Boolean,
		unique: false,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	updatedAt: {
		type: Date,
		required: true
	},
})

module.exports = mongoose => {
  return mongoose.model('Task', TaskSchema)
}