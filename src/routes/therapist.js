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
  .patch(therapist.update)
  .delete(therapist.delete);

router.route("/:id/status").patch(therapist.changeTherapistStatus);

module.exports = router;
