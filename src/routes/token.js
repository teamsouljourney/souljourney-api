"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

const {
  list,
  create,
  read,
  update,
  deleteToken,
} = require("../controllers/token");

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deleteToken);

/* ------------------------------------------------- */

module.exports = router;
