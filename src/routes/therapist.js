"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router();

const therapist = require("../controllers/therapist");

router.route("/").get(therapist.list).post(therapist.create);
router
  .route("/:id")
  .get(therapist.read)
  .put(therapist.update)
  // .patch(therapist.update)
  .patch(therapist.changeTherapistStatus)
  .delete(therapist.delete);

module.exports = router;
