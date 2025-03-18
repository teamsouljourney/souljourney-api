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
  deleteTimeTable,
} = require("../controllers/therapistTimeTable");

router.route("/").get(list).post(create);
router
  .route("/:id")
  .get(read)
  .put(update)
  .patch(update)
  .delete(deleteTimeTable);

/* ------------------------------------------------- */

module.exports = router;
