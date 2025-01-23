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
      // 'done' is passed here as the callback
      try {
        // console.log("Google Profile: ", profile);
        const email = profile.emails[0].value;

        // First, check if the user already exists in the database using Google ID or email
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: email }],
        });

        // If the user exists, we update their information
        if (user) {
          user.googleId = profile.id;
          user.firstName = user.firstName;
          user.lastName = user.lastName;
          user.image = user.image ? user.image : profile.photos[0].value;
          user.isEmailVerified = true;

          await user.save();
          return done(null, user);
        }

        let userName =
          profile.name.givenName.toLowerCase() +
          profile.name.familyName.toLowerCase();

        // If the user does not exist, create a new user  /// user = await User.create
        user = new User({
          googleId: profile.id,
          userName,
          email,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos
            ? profile.photos[0].value
            : "default-avatar.jpg",
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
