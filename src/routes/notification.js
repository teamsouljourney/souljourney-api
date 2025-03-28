"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

//routes/message:
const {
  list,
  create,
  read,
  isRead,
  deleteNotification,
} = require("../controllers/notification");

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(isRead).delete(deleteNotification);

module.exports = router;
