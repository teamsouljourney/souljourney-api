"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

const {
  list,
  getUserAppointments,
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

router.route("/user/:id").get(getUserAppointments);

/* ------------------------------------------------- */

module.exports = router;
