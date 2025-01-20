"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

// Auth Controller:

const User = require("../models/user");
const { signVerificationToken } = require("../helpers/jwtFunctions");
const sendEmail = require("../helpers/sendEmail");

module.exports = {
  signup: async (req, res) => {
    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isVerified: false,
    });

    const verificationToken = signVerificationToken(newUser._id);

    const verificationUrl = `${process.env.SERVER_URL}/auth/verify-email?token=${verificationToken}`;

    const message = `Click the following link to verify your email address: ${verificationUrl}`;

    await sendEmail({
      email: newUser.email,
      subject: "Verify Your Email",
      message,
    });

    res.status(201).json({
      status: "success",
      message: "A verification email has been sent to your email address.",
    });
  },

  verifyEmail: async (req, res) => {
    /*
          #swagger.tags = ["Authentication"]
          #swagger.summary = "Verify Email"
          #swagger.description = 'Verify a user’s email address using a token sent via email.'
          #swagger.parameters["token"] = {
              in: "query",
              required: true,
              description: "Verification token from email.",
              type: "string"
          }
      */
    const { token } = req.query;

    if (!token) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/verify-email/success?status=missing-token`
      );
    }

    let decoded;
    try {
      decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_VERIFICATION_SECRET
      );
    } catch (error) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/verify-email/success?status=invalid-token`
      );
    }

    const user = await User.findOne({
      _id: decoded.id.toString(),
    });

    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/verify-email/success?status=user-not-found`
      );
    }

    if (user.isVerified) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/verify-email/success?status=already-verified`
      );
    }

    await user.markAsVerified();

    return res.redirect(
      `${process.env.CLIENT_URL}/auth/verify-email/success?status=success`
    );
  },
};
