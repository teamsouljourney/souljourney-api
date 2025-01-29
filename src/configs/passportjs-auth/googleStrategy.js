"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        process.env.SERVER_URL || process.env.LOCAL_SERVER_URL
      }/auth/oauth2/callback/google`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Check if the user already exists in the database
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: email }],
        });

        // If the user exists, update their information
        if (user) {
          user.googleId = profile.id;
          user.firstName = user.firstName;
          user.lastName = user.lastName;
          user.image = user.image ? user.image : profile.photos[0]?.value;
          user.isEmailVerified = true;

          await user.save();
          return done(null, user);
        }

        // Handle missing profile name using optional chaining
        let userName =
          (profile.name?.givenName?.toLowerCase() || "") +
          (profile.name?.familyName?.toLowerCase() || "");

        // Fallback to email as userName if no name available
        if (!userName) {
          userName = email.split("@")[0]; // Fallback to email username
        }

        // Check for required fields
        const firstName = profile.name?.givenName || "Unknown"; // Fallback to "Unknown"
        const lastName = profile.name?.familyName || "Unknown"; // Fallback to "Unknown"

        // If the user doesn't exist, create a new one
        user = new User({
          googleId: profile.id,
          userName,
          email,
          firstName,
          lastName,
          image: profile.photos?.[0]?.value || "default-avatar.jpg",
          isEmailVerified: true,
        });

        await user.save();
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
