"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

// Tokens:
router.use("/tokens", require("./token"));

// User:
router.use("/users", require("./user"));

// Feedbacks:
router.use("/feedbacks", require("./feedback"));

//category
router.use("/categories", require("./category"));

//documents:
router.use("/documents", require("./document"))


/* ------------------------------------------------- */

module.exports = router;
