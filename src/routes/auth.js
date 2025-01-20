"use strict";

/* ------------------------------------------------- */
/*                  BLOGMOTION API                   */
/* ------------------------------------------------- */

const router = require("express").Router();

/* ------------------------------------------------- */

const { signup, verifyEmail } = require("../controllers/auth");

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);

/* ------------------------------------------------- */

module.exports = router;
