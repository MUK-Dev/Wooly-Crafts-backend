const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const products = require("./routes/products");
const orders = require("./routes/orders");

const app = express();
app.use(express.json());
app.use(cors());
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
app.use(products);
app.use(orders);

app.use((error, req, res, next) => {
	if (res.headerSent) {
	  return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});
  

//-------------------- Database Connection --------------------

mongoose.connect("mongodb://localhost:27017/woolyCraftsDB", {
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

