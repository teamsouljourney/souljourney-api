"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

// Auth Controller:

const User = require("../models/user");
const {
  signVerificationToken,
  createSendToken,
} = require("../helpers/jwtFunctions");
const sendEmail = require("../helpers/sendEmail");
const CustomError = require("../errors/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");

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

  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password to get Token and JWT.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "testUser",
                    "password": "password123"
                }
            }
        */

    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
      throw new CustomError("Please provide email and password!", 400);
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username });

    if (!user.isVerified) {
      throw new CustomError("Please verify your email before logging in", 401);
    }

    // 3) Check if user isActive
    if (!user.isActive) {
      throw new CustomError(
        "This account is not active. Please contact support for assistance.",
        401
      );
    }

    // 4) Compare  Password
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new CustomError("Incorrect email or password", 401);
    }

    // 5) If everything ok, send token to client
    // TOKEN:
    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData)
      tokenData = await Token.create({
        userId: user._id,
        token: passwordEncrypt(user._id + Date.now()),
      });

    // JWT:
    createSendToken(user, 200, tokenData, res);
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
            #swagger.description = 'Logout user by deleting or blacklisting the token.'
            #swagger.parameters["authorization"] = {
                in: "header",
                required: true,
                description: "Authorization token in 'Bearer <token>' or 'Token <token>' format.",
                type: "string"
            }
        */
    const auth = req.headers?.authorization || null;

    if (!auth) {
      return res.status(400).json({
        status: "fail",
        message:
          "Authorization header is missing. Please provide a valid token.",
      });
    }

    const [tokenType, tokenValue] = auth.split(" ");

    if (!tokenValue) {
      return res.status(400).json({
        status: "fail",
        message:
          "Token value is missing. Ensure the format is 'Token <value>' or 'Bearer <value>'.",
      });
    }

    switch (tokenType) {
      case "Token":
        const result = await Token.deleteOne({ token: tokenValue });

        return res.status(result.deletedCount > 0 ? 200 : 404).json({
          status: result.deletedCount > 0 ? "success" : "fail",
          message:
            result.deletedCount > 0
              ? "Simple token deleted successfully. Logout completed."
              : "Simple token not found. It may have already been logged out.",
        });

      case "Bearer":
        // await blacklistToken(tokenValue);

        return res.status(200).json({
          status: "success",
          message: "JWT blacklisted successfully. Logout completed.",
        });

      default:
        return res.status(400).json({
          status: "fail",
          message: `Unsupported token type '${tokenType}'. Use 'Token' or 'Bearer'.`,
        });
    }
  },
};
