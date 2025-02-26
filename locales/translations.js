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

  category: {
    listSuccess: "listSuccess",
    createSuccess: "createSuccess",
    readSuccess: "readSuccess",
    updateSuccess: "updateSuccess",
    deleteSuccess: "deleteSuccess",
    notFound: "notFound",
  },

  token: {
    notFound: "notFound",
    listSuccess: "listSuccess",
    createSuccess: "createSuccess",
    readSuccess: "readSuccess",
    updateSuccess: "updateSuccess",
    deleteSuccess: "deleteSuccess",
  },

  appointment: {
    listSuccess: "listSuccess",
    getUserAppointmentsSuccess: "getUserAppointmentsSuccess",
    pastDateError: "pastDateError",
    userConflictError: "userConflictError",
    therapistConflictError: "therapistConflictError",
    createError: "createError",
    createSuccess: "createSuccess",
    readSuccess: "readSuccess",
    notFound: "notFound",
    updateSuccess: "updateSuccess",
    deleteError: "deleteError",
    deleteSuccess: "deleteSuccess",
  },
};

module.exports = translations;
