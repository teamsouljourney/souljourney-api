"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

const router = require("express").Router();
const passport = require("passport");

/* ------------------------------------------------- */

const {
  signup,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  authSuccess,
} = require("../controllers/auth");

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);

router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// Google authentication routes
router.get(
  /*
    #swagger.tags = ["Google Authentication"]
    #swagger.summary = "Google Authentication Request"
    #swagger.description = "Initiates Google OAuth2 authentication process."
    #swagger.responses[302] = {
        description: "Redirects to Google authentication page."
    }
*/

  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  /*
    #swagger.tags = ["Google Authentication"]
    #swagger.summary = "Google OAuth2 Callback"
    #swagger.description = "Handles the callback from Google after authentication."
    #swagger.responses[302] = {
        description: "Redirects to the success or failure page based on authentication result.",
        schema: {
            success: "Redirects to CLIENT_URL/auth/success",
            failure: "Redirects to CLIENT_URL/auth/failure"
        }
    }
*/

  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: true,
    failureRedirect: `${process.env.CLIENT_URL}/auth/failure`,
  }),
  authSuccess
);

/* ------------------------------------------------- */

module.exports = router;
