const express = require("express");

const HttpError = require('../models/http-error');
const getAllProducts = require("../controllers/product-controller")
const router  = express.Router();

router.route("/products").get();

module.exports = router;