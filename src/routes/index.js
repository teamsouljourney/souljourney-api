"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

// Tokens:
router.use("/tokens", require("./token"));

// Feedbacks:
router.use("/feedbacks", require("./feedback"));

/* ------------------------------------------------- */

module.exports = router;
