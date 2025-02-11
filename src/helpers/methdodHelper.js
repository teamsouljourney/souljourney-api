"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const resetTokenHash = require("./resetTokenHash");

/**
 * Compares a candidate password with the user's hashed password.
 * @param {string} candidatePassword - The password entered by the user.
 * @param {string} userPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if passwords match, false otherwise.
 */
const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * Marks the user's email as verified.
 */
const markAsVerified = async function () {
  this.isEmailVerified = true;
  await this.save({ validateBeforeSave: false });
};

/**
 * Generates a password reset token, hashes it, and sets an expiration.
 * @returns {string} - The raw reset token.
 */
const createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = resetTokenHash(resetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

/**
 * Creates a verification code and sets an expiration time.
 * @returns {number} - The verification code.
 */
const createVerificationCode = function () {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = Date.now() + 10 * 60 * 1000;
  return verificationCode;
};

module.exports = {
  comparePassword,
  markAsVerified,
  createPasswordResetToken,
  createVerificationCode,
};
