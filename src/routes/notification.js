"use strict";

const router = require("express").Router();

//routes/message:
const { list, create, isRead } = require("../controllers/notification");

router.route("/").get(list).post(create);

router.route("/:id").put(isRead);

module.exports = router;
