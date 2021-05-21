const express = require("express");

const productController = require("../controllers/product-controller")
const router  = express.Router();

router.route("/products").get(productController.getAllProducts).post(productController.postNewProduct);

module.exports = router;