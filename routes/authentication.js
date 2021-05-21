const express = require("express");

const userController = require("../controllers/user-controller");
const { route } = require("./products");

const router = express.Router();

router.route("/users").get(userController.getAllUsers);

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

module.exports = router;