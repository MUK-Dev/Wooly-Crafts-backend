const mongoose = require('mongoose');
const { use } = require('../routes/products');

const userSchema = mongoose.Schema(
	{
		name: {type: String, required: true},
		email: {type: String, required: true},
		phone: {type: String, required: true},
		password: {type: String, required: true},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User",userSchema);