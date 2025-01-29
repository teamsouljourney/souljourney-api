"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

/* AUTH ROUTES */

// Auth
router.use("/auth", require("./auth"));

// Tokens:
router.use("/tokens", require("./token"));

// User:
router.use("/users", require("./user"));

/* --------------------------------- */

/* OTHER ROUTES */

// Categories
router.use("/categories", require("./category"));

// Documents:
router.use("/documents", require("./document"));

// Feedbacks:
router.use("/feedbacks", require("./feedback"));

/* ------------------------------------------------- */

module.exports = router;
