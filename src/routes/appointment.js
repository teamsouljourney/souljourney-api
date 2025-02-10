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
  deleteAppointment,
} = require("../controllers/appointment");

router.route("/").get(list).post(create);

router
  .route("/:id")
  .get(read)
  .put(update)
  .patch(update)
  .delete(deleteAppointment);

/* ------------------------------------------------- */

module.exports = router;
