"use strict";

/* ------------------------------------------------- */
/*                  BLOGMOTION API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

/* ------------------------------------------------- */

const { signup } = require("../controllers/auth");

router.post("/signup", signup);

/* ------------------------------------------------- */

module.exports = router;
