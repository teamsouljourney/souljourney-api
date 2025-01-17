"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const router = require("express").Router();

// Tokens:
router.use("/tokens", require("./tokens"));
