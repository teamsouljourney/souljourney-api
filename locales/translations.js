"use strict";

const translations = {
  auth: {
    signupSuccess: "signupSuccess",
    loginSuccess: "loginSuccess",
    userNotFound: "userNotFound",
    verificationEmailSent: "authVerificationEmailSent",
    verificationEmailSubject: "authVerificationEmailSubject",
    verifyEmailSuccess: "authVerifyEmailSuccess",
    verifyEmailError: "authVerifyEmailError",
    verifyEmailMissingToken: "authVerifyEmailMissingToken",
    verifyEmailInvalidToken: "authVerifyEmailInvalidToken",
    verifyEmailUserNotFound: "authVerifyEmailUserNotFound",
    verifyEmailAlreadyVerified: "authVerifyEmailAlreadyVerified",
    welcomeEmailSubject: "authWelcomeEmailSubject",
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

  user: {
    listSuccess: "userListSuccess",
    createSuccess: "userCreateSuccess",
    readSuccess: "userReadSuccess",
    updateSuccess: "userUpdateSuccess",
    deleteSuccess: "userDeleteSuccess",
    notFound: "userNotFound",
    verificationEmailSent: "userVerificationEmailSent",
    verificationEmailSubject: "userVerificationEmailSubject",
    verificationEmailMessage: "userVerificationEmailMessage",
    statusChanged: "userStatusChanged",
    statusActive: "userStatusActive",
    statusDisabled: "userStatusDisabled",
    updateFailed: "userUpdateFailed",
    passwordFieldsRequired: "userPasswordFieldsRequired",
    currentPasswordIncorrect: "userCurrentPasswordIncorrect",
    passwordsDontMatch: "userPasswordsDontMatch",
    passwordChangeSuccess: "userPasswordChangeSuccess",
  },

  therapist: {
    listSuccess: "therapistListSuccess",
    createSuccess: "therapistCreateSuccess",
    readSuccess: "therapistReadSuccess",
    updateSuccess: "therapistUpdateSuccess",
    deleteSuccess: "therapistDeleteSuccess",
    notFound: "therapistNotFound",
    statusChanged: "therapistStatusChanged",
    statusActive: "therapistStatusActive",
    statusDisabled: "therapistStatusDisabled",
    updateFailed: "therapistUpdateFailed",
    passwordFieldsRequired: "therapistPasswordFieldsRequired",
    currentPasswordIncorrect: "therapistCurrentPasswordIncorrect",
    passwordsDontMatch: "therapistPasswordsDontMatch",
    passwordChangeSuccess: "therapistPasswordChangeSuccess",
    noFileUploaded: "therapistNoFileUploaded",
    profilePictureUploaded: "therapistProfilePictureUploaded",
  },

  feedback: {
    listSuccess: "feedbackListSuccess",
    createSuccess: "feedbackCreateSuccess",
    readSuccess: "feedbackReadSuccess",
    updateSuccess: "feedbackUpdateSuccess",
    deleteSuccess: "feedbackDeleteSuccess",
    notFound: "feedbackNotFound",
    noAppointment: "feedbackNoAppointment",
    getSingleTherapistSuccess: "feedbackGetSingleTherapistSuccess",
  },

  blog: {
    listSuccess: "blogListSuccess",
    createSuccess: "blogCreateSuccess",
    readSuccess: "blogReadSuccess",
    updateSuccess: "blogUpdateSuccess",
    deleteSuccess: "blogDeleteSuccess",
    notFound: "blogNotFound",
    updateUnauthorized: "blogUpdateUnauthorized",
    deleteUnauthorized: "blogDeleteUnauthorized",
    deleteFailed: "blogDeleteFailed",
    getLikeSuccess: "blogGetLikeSuccess",
    postLikeSuccess: "blogPostLikeSuccess",
  },

  message: {
    listSuccess: "messageListSuccess",
    createSuccess: "messageCreateSuccess",
    markAsSeenSuccess: "messageMarkAsSeenSuccess",
    deleteSuccess: "messageDeleteSuccess",
    notFound: "messageNotFound",
    invalidUserType: "messageInvalidUserType",
  },

  notes: {
    listSuccess: "notesListSuccess",
    createSuccess: "notesCreateSuccess",
    readSuccess: "notesReadSuccess",
    updateSuccess: "notesUpdateSuccess",
    deleteSuccess: "notesDeleteSuccess",
    notFound: "notesNotFound",
    notFoundOrNoPermission: "notesNotFoundOrNoPermission",
    deletedOrNoPermission: "notesDeletedOrNoPermission",
    getSingleUserSuccess: "notesGetSingleUserSuccess",
  },

  notification: {
    listSuccess: "notificationListSuccess",
    createSuccess: "notificationCreateSuccess",
    readSuccess: "notificationReadSuccess",
    markAsReadSuccess: "notificationMarkAsReadSuccess",
    deleteSuccess: "notificationDeleteSuccess",
    notFound: "notificationNotFound",
    invalidUserType: "notificationInvalidUserType",
  },

  middleware: {
    tokenUserNotExists: "middlewareAuthTokenUserNotExists",
    jwtUserNotExists: "middlewareAuthJwtUserNotExists",
  },
};

module.exports = translations;
