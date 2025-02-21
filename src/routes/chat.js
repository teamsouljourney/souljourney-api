"use strict";

const router = require("express").Router();
const chats = require("../helpers/data");
const chat = require("../controllers/chat");

router.route("/").get(chat.accessChat);

router.route("/:id").get(chat.read);

module.exports = router;
