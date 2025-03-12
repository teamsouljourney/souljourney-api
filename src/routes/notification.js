"use strict";

const router = require("express").Router();

//routes/message:
const { list, create, read, isRead } = require("../controllers/notification");

router.route("/").get(list).post(create).put(isRead);

router.route("/:id").get(read);

module.exports = router;
