const express = require("express");

const messagesController = require("../controllers/message-controller");


const router = express.Router();

router.route("/messages")
.get(messagesController.getAllMessages)
.post(messagesController.postNewMessage);

module.exports = router;