"use strict";

const router = require("express").Router();

//routes/message:
const {
  getMessages,
  sendMessage,
  markAsSeen,
  deleteMessage,
} = require("../controllers/message");

router.route("/").get(getMessages).post(sendMessage).post(markAsSeen);

router.route("/:id").delete(deleteMessage);

module.exports = router;
