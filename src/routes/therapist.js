"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

const therapist = require("../controllers/therapist");
const { upload } = require("../middlewares/upload");

router.route("/").get(therapist.list).post(therapist.create);
router
  .route("/:id")
  .get(therapist.read)
  .put(therapist.update)
  .patch(therapist.update)
  .delete(therapist.delete);

router.route("/:id/status").patch(therapist.changeTherapistStatus);
router.route("/:id/updateMe").patch(therapist.updateMe);
router.route("/:id/changeMyPassword").patch(therapist.changeMyPassword);
router
  .route("/:id/upload-profile-picture")
  .post(upload.single("image"), therapist.uploadProfilePicture);

module.exports = router;
