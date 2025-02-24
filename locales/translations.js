"use strict";

const translations = {
  auth: {
    signupSuccess: "signupSuccess",
    loginSuccess: "loginSuccess",
    userNotFound: "userNotFound",
  },

  login: {
    provideEmailAndPassword: "provideEmailAndPassword",
    incorrectEmailOrPassword: "incorrectEmailOrPassword",
    verifyEmail: "verifyEmail",
    accountNotActive: "accountNotActive",
  },

  logout: {
    authorizationHeaderMissing: "authorizationHeaderMissing",
    tokenValueMissing: "tokenValueMissing",
    logoutSuccess: "logoutSuccess",
    tokenNotFound: "tokenNotFound",
    jwtBlacklistedSuccess: "jwtBlacklistedSuccess",
    unsupportedTokenType: "unsupportedTokenType",
  },

  forgotPassword: {
    forgotUserNotFound: "forgotUserNotFound",
    resetTokenSuccess: "resetTokenSuccess",
    resetTokenError: "resetTokenError",
    resetPasswordSubject: "resetPasswordSubject",
  },

  resetPassword: {
    invalidToken: "invalidToken",
    missingFields: "missingFields",
    passwordMismatch: "passwordMismatch",
    tokenExpired: "tokenExpired",
    invalidVerificationCode: "invalidVerificationCode",
    passwordResetSuccess: "passwordResetSuccess",
  },
};

module.exports = translations;
