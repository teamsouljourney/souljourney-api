"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

const category = require("../controllers/category");
const permission = require("../middlewares/permission");

// URL: /categories

router.route("/").get(category.list).post(permission.isAdmin, category.create);

router
  .route("/:id")
  .get(category.read)
  .put(permission.isAdmin, category.update)
  .patch(permission.isAdmin, category.update)
  .delete(permission.isAdmin, category.delete);

/* ------------------------------------------------------- */
// Exports:
module.exports = router;
