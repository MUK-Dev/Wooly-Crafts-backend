const express = require("express");
const { route } = require("./products");

const router = express.Router();

router.route("/orders");

module.exports = router;