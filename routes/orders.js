const express = require("express");

const ordersController = require("../controllers/order-controller");


const router = express.Router();

router.route("/orders")
.get(ordersController.getAllOrders)
.post(ordersController.postNewOrder);

module.exports = router;