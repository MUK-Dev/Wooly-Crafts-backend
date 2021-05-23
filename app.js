require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

const products = require("./routes/products");
const orders = require("./routes/orders");
const authentication = require("./routes/authentication");
const messages = require("./routes/messages");

const app = express();
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Allow-Methods", "GET POST PATCH DELETE");
		next();
});
	
app.use(cors());

app.use(express.json({
	limit: 52428800
}));
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

app.use(products);
app.use(orders);
app.use(authentication);
app.use(messages);

//-------------------- Database Connection --------------------

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}).then(()=>{
	app.listen(5000, () => {
	console.log("Server running on port 5000");
	});
}).catch(err=>{
	console.log(err);
});

//------------------------------------------------------------

