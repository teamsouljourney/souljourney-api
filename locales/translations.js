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
    listSuccess: "categoryListSuccess",
    createSuccess: "categoryCreateSuccess",
    readSuccess: "categoryReadSuccess",
    updateSuccess: "categoryUpdateSuccess",
    deleteSuccess: "categoryDeleteSuccess",
    notFound: "categoryNotFound",
  },

  token: {
    listSuccess: "tokenListSuccess",
    createSuccess: "tokenCreateSuccess",
    readSuccess: "tokenReadSuccess",
    updateSuccess: "tokenUpdateSuccess",
    deleteSuccess: "tokenDeleteSuccess",
  },

  appointment: {
    listSuccess: "appointmentListSuccess",
    getUserAppointmentsSuccess: "appointmentGetUserAppointmentsSuccess",
    pastDateError: "appointmentPastDateError",
    userConflictError: "appointmentUserConflictError",
    therapistConflictError: "appointmentTherapistConflictError",
    createError: "appointmentCreateError",
    createSuccess: "appointmentCreateSuccess",
    readSuccess: "appointmentReadSuccess",
    notFound: "appointmentNotFound",
    updateSuccess: "appointmentUpdateSuccess",
    deleteError: "appointmentDeleteError",
    deleteSuccess: "appointmentDeleteSuccess",
  },

  therapistTimeTable: {
    listSuccess: "therapistTimeTableListSuccess",
    createSuccess: "therapistTimeTableCreateSuccess",
    readSuccess: "therapistTimeTableReadSuccess",
    updateSuccess: "therapistTimeTableUpdateSuccess",
    deleteSuccess: "therapistTimeTableDeleteSuccess",
    notFound: "therapistTimeTableNotFound",
  },
};

module.exports = translations;
