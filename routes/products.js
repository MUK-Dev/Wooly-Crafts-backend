const express = require("express");

const productController = require("../controllers/product-controller");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router
  .route("/products")
  .get(productController.getAllProducts)
  .post(fileUpload.array("images"), productController.postNewProduct);

router.route("/search").post(productController.searchProducts);

router
  .route("/products/:productId")
  .get(productController.getSingleProduct)
  .delete(productController.deleteSingleProduct)
  .patch(productController.updateProduct);

module.exports = router;
