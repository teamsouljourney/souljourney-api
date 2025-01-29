"use strict";

const router = require("express").Router();

//routes/feedback:
const {
  list,
  create,
  read,
  update,
  deleteFeedback,
} = require("../controllers/feedback");

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deleteFeedback);

module.exports = router;
