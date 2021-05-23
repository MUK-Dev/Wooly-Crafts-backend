const express = require("express");

const productController = require("../controllers/product-controller")
const fileUpload = require("../middleware/file-upload");
const router  = express.Router();

router.route("/products").get(productController.getAllProducts).post(fileUpload.array("images"), productController.postNewProduct);

module.exports = router;
