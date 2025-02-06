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
const permission = require("../middlewares/permission");

// URL: /categories

router.route("/").get(list).post(permission.isAdmin, create);

router
  .route("/:id")
  .get(read)
  .put(permission.isAdmin, update)
  .patch(permission.isAdmin, update)
  .delete(permission.isAdmin, deleteCategory);

/* ------------------------------------------------------- */
// Exports:
module.exports = router;
