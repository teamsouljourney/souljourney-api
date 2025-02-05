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

// Blogs:
router.use("/blogs", require("./blog"));

// Categories
router.use("/categories", require("./category"));

// Documents:
router.use("/documents", require("./document"));

// Feedbacks:
router.use("/feedbacks", require("./feedback"));

// Notes:
router.use("/notes", require("./notes"))


/* ------------------------------------------------- */

module.exports = router;
