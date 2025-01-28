"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

// Auth
router.use("/auth", require("./auth"));

// User:
router.use("/users", require("./user"));

// Tokens:
router.use("/tokens", require("./token"));

// Feedbacks:
router.use("/feedbacks", require("./feedback"));

// Category
router.use("/categories", require("./category"));

// documents:
router.use("/documents", require("./document"));

//blogs:
router.use("/blogs", require("./blog"));

/* ------------------------------------------------- */

module.exports = router;
