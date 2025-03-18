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
  deleteCategory,
} = require("../controllers/category");

// URL: /categories

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deleteCategory);

/* ------------------------------------------------------- */
// Exports:
module.exports = router;
