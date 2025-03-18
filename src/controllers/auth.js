"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

// Auth Controller:

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user");
const Token = require("../models/token");
const {
  signVerificationToken,
  createSendToken,
  signResetToken,
  signAccessToken,
  signRefreshToken,
} = require("../helpers/jwtFunctions");
const sendEmail = require("../helpers/sendEmail");
const CustomError = require("../errors/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const blacklistToken = require("../helpers/blacklistFunctions");
const Therapist = require("../models/therapist");
const translations = require("../../locales/translations");
const {
  verificationEmail,
} = require("../utils/emailTamplates/verificationEmail");
const { welcomeEmail } = require("../utils/emailTamplates/welcomeEmail");
const {
  forgotPasswordEmail,
} = require("../utils/emailTamplates/forgotPasswordEmail");

module.exports = {
  signup: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Signup"
        #swagger.description = 'Create a new user account and send a verification email.'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "testUser",
                "firstName": "John",
                "lastName": "Doe",
                "email": "test@example.com",
                "password": "password123"
            }
        }
            
    */
    const newUser = await User.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isVerified: false,
    });

    const verificationToken = signVerificationToken(newUser._id);

    const verificationUrl = `${process.env.SERVER_URL}/auth/verify-email?token=${verificationToken}`;

    const message = verificationEmail(newUser.userName, verificationUrl);

    await sendEmail({
      email: newUser.email,
      subject: req.t(translations.auth.verificationEmailSubject),
      message,
    });

    res.status(201).json({
      status: "success",
      message: req.t(translations.auth.verificationEmailSent),
    });
  },

  verifyEmail: async (req, res) => {
    /*
          #swagger.tags = ["Authentication"]
          #swagger.summary = "Verify Email"
          #swagger.description = 'Verify a user's email address using a token sent via email.'
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
        `${process.env.CLIENT_URL}/auth/verify-email?statusType=error&status=missing-token`
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
        `${process.env.CLIENT_URL}/auth/verify-email?statusType=error&status=invalid-token`
      );
    }

    const user = await User.findOne({
      _id: decoded.id.toString(),
    });

    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/verify-email?statusType=error&status=user-not-found`
      );
    }

    if (user.isVerified) {
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/verify-email?statusType=warning&status=already-verified`
      );
    }

    await user.markAsVerified();

    const message = welcomeEmail(user.userName);

    await sendEmail({
      email: user.email,
      subject: req.t(translations.auth.welcomeEmailSubject),
      message,
    });

    return res.redirect(
      `${process.env.CLIENT_URL}/auth/verify-email?statusType=success&status=success`
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
                    "email": "testUser",
                    "password": "password123"
                }
            }
        */

    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      throw new CustomError(
        req.t(translations.login.provideEmailAndPassword),
        400
      );
    }

    // 2) Check if user exists in either collection
    let user = await User.findOne({ email });
    let userType = "User";

    if (!user) {
      user = await Therapist.findOne({ email });
      userType = "Therapist";
    }

    if (!user) {
      throw new CustomError(
        req.t(translations.login.incorrectEmailOrPassword),
        401
      );
    }

    // Check email verification
    if (userType === "User" && !user.isEmailVerified) {
      throw new CustomError(req.t(translations.login.verifyEmail), 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new CustomError(req.t(translations.login.accountNotActive), 401);
    }

    // Check password
    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new CustomError(
        req.t(translations.login.incorrectEmailOrPassword),
        401
      );
    }

    // 6) If everything is ok, send token to client
    let tokenData = await Token.findOne({
      $or: [{ userId: user._id }, { therapistId: user._id }],
    });

    if (!tokenData) {
      tokenData = await Token.create({
        userId: userType === "User" ? user._id : null,
        therapistId: userType === "Therapist" ? user._id : null,
        userType,
        token: passwordEncrypt(user._id + Date.now()),
      });
    }

    createSendToken(user, 200, tokenData, res);
  },

  authSuccess: async (req, res) => {
    const user = req.user;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/auth/failure`);
    }
    // TOKEN:
    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData)
      tokenData = await Token.create({
        userId: user._id,
        userType: "User",
        token: passwordEncrypt(user._id + Date.now()),
      });

    // JWT:
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const data = {
      error: false,
      message: req.t(translations.auth.loginSuccess),
      token: tokenData.token,
      bearer: {
        access: accessToken,
        refresh: refreshToken,
      },
      user,
    };

    res.redirect(
      `${process.env.CLIENT_URL}/auth/success?user=${encodeURIComponent(
        JSON.stringify(data)
      )}`
    );
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
      throw new CustomError(
        req.t(translations.logout.authorizationHeaderMissing),
        400
      );
    }

    const [tokenType, tokenValue] = auth.split(" ");

    if (!tokenValue) {
      throw new CustomError(req.t(translations.logout.tokenValueMissing), 400);
    }

    switch (tokenType) {
      case "Token":
        const result = await Token.deleteOne({ token: tokenValue });

        return res.status(result.deletedCount > 0 ? 200 : 404).json({
          status: result.deletedCount > 0 ? "success" : "fail",
          message:
            result.deletedCount > 0
              ? req.t(translations.logout.logoutSuccess)
              : req.t(translations.logout.tokenNotFound),
        });

      case "Bearer":
        await blacklistToken(tokenValue);

        return res.status(200).json({
          status: "success",
          message: req.t(translations.logout.jwtBlacklistedSuccess),
        });

      default:
        throw new CustomError(
          req.t(translations.logout.unsupportedTokenType, {
            tokenType,
          }),
          400
        );
    }
  },

  forgotPassword: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Forgot Password"
        #swagger.description = 'Send a reset password token to the user's registered email address.'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "email": "test@example.com"
            }
        }
    */

    const { email } = req.body;

    let account = await User.findOne({ email });

    if (!account) {
      account = await Therapist.findOne({ email });
    }

    if (!account) {
      throw new CustomError(
        req.t(translations.forgotPassword.forgotUserNotFound),
        404
      );
    }

    // 2) Generate resetToken and verificationCode
    const resetToken = account.createPasswordResetToken();
    const verificationCode = account.createVerificationCode();
    await account.save({ validateBeforeSave: false });

    // Generate JWT token with resetToken and verificationCode
    const jwtResetToken = signResetToken(
      account._id,
      resetToken,
      verificationCode
    );

    // Reset URL with JWT
    const resetURL = `${process.env.CLIENT_URL}/auth/reset-password/${jwtResetToken}`;

    const message = forgotPasswordEmail(
      account.userName,
      resetURL,
      verificationCode
    );

    try {
      await sendEmail({
        email: account.email,
        subject: req.t(translations.forgotPassword.resetPasswordSubject),
        message,
      });

      res.status(200).json({
        status: "success",
        message: req.t(translations.forgotPassword.resetTokenSuccess),
        jwtResetToken,
      });
    } catch (err) {
      console.error("Error in forgotPassword:", err);

      account.passwordResetToken = undefined;
      account.passwordResetExpires = undefined;
      account.verificationCode = undefined;
      account.verificationCodeExpires = undefined;
      await account.save({ validateBeforeSave: false });

      throw new CustomError(
        req.t(translations.forgotPassword.resetTokenError),
        500
      );
    }
  },

  resetPassword: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Reset Password"
        #swagger.description = 'Reset user password using a valid reset token and verification code.'
        #swagger.parameters["token"] = {
            in: "path",
            required: true,
            description: "Password reset token provided in the URL.",
            type: "string"
        }
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "password": "newPassword123",
                "passwordConfirm": "newPassword123",
                "verificationCode": "123456"
            }
        }
    */

    // 1) Validate token
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_RESET_SECRET
    );
    if (!decodedToken || !decodedToken.id) {
      throw new CustomError(
        req.t(translations.resetPassword.invalidToken),
        400
      );
    }

    // 2) Validate new password and password confirmation
    const { password, confirmPassword, verificationCode } = req.body;
    if (!password || !confirmPassword || !verificationCode) {
      throw new CustomError(
        req.t(translations.resetPassword.missingFields),
        400
      );
    }
    if (password !== confirmPassword) {
      throw new CustomError(
        req.t(translations.resetPassword.passwordMismatch),
        400
      );
    }

    // 3) Find user or therapist by decoded token id and check if the verification code is correct
    let account = await User.findOne({
      _id: decodedToken.id,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!account) {
      account = await Therapist.findOne({
        _id: decodedToken.id,
        passwordResetExpires: { $gt: Date.now() },
      });
    }

    if (!account) {
      throw new CustomError(
        req.t(translations.resetPassword.tokenExpired),
        400
      );
    }

    if (account.verificationCode != verificationCode) {
      throw new CustomError(
        req.t(translations.resetPassword.invalidVerificationCode),
        400
      );
    }

    // 4) Update password and clear reset fields
    account.password = password;
    account.confirmPassword = confirmPassword;
    account.passwordResetToken = undefined;
    account.passwordResetExpires = undefined;
    account.verificationCode = undefined;
    account.verificationCodeExpires = undefined;
    await account.save();

    // 5) Send response
    res.status(200).json({
      status: "success",
      message: req.t(translations.resetPassword.passwordResetSuccess),
    });
  },
};
