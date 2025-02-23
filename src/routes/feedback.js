"use strict";

const router = require("express").Router();

//routes/feedback:
const {
  list,
  create,
  read,
  update,
  deleteFeedback,
  getSingleTherapistFeedbacks
} = require("../controllers/feedback");

router.route("/")
  .get(list)
  .post(create);

router.route("/:id")
  .get(read)
  .put(update)
  .patch(update)
  .delete(deleteFeedback);

router.route("/therapists/:therapistId").get(getSingleTherapistFeedbacks)

module.exports = router;
