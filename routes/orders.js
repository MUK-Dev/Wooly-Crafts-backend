const express = require("express");

const ordersController = require("../controllers/order-controller");


const router = express.Router();

router.route("/orders")
.get(ordersController.getAllOrders)
.post(ordersController.postNewOrder);

router.route("/finishedOrders").get(ordersController.getFinishedOrders);

router.route("/orders/:orderId").patch(ordersController.completeOrder);

module.exports = router;