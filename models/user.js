const mongoose = require('mongoose');
const { use } = require('../routes/products');

const userSchema = mongoose.Schema(
	{
		name: String,
		email: String,
		phone: String,
		password: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User",userSchema);

// {
//     "name": "Sample User",
//     "email": "test@test.com",
//     "phone": "111222333",
//     "password": "123456"
// }