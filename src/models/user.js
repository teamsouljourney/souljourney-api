"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const crypto = require("crypto");
const { mongoose } = require("../configs/dbConnection");
const validator = require("validator");
const validatePassword = require("../helpers/validatePassword");
const bcrypt = require("bcryptjs");
const resetTokenHash = require("../helpers/resetTokenHash");

/* ------------------------------------------------------- *
User Model requirements
{
    "userName": "admin",
    "password": "aA?123456",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin"
}
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: function () {
        return this.googleId ? false : true;
      },
      trim: true,
      validate: {
        validator: validatePassword,
        message:
          "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      validate: [validator.isEmail, "Please provide a valid e-mail!"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    profession: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationCode: Number,
    verificationCodeExpires: Date,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// Hash the password before saving the user to the database
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to mark the user's email as verified
UserSchema.methods.markAsVerified = async function () {
  this.isEmailVerified = true;
  await this.save({ validateBeforeSave: false });
};

// Method to check if the provided password matches the hashed password in the database
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/*
 * This method generates a password reset token for a user.
 * It creates a random token, hashes it for security, and sets an expiration time.
 * The raw token is returned to be sent to the user via email.
 */
UserSchema.methods.createPasswordResetToken = function () {
  // Generates a random 32-byte reset token and converts it to a hexadecimal string
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hashes the reset token and stores it in the database for security
  this.passwordResetToken = resetTokenHash(resetToken);

  // Sets an expiration time for the reset token (10 minutes from now)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Returns the raw reset token (not hashed) to be sent to the user
  return resetToken;
};

// Method to create a verification code and set an expiration time
UserSchema.methods.createVerificationCode = function () {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  this.verificationCode = verificationCode;

  this.verificationCodeExpires = Date.now() + 10 * 60 * 1000;

  return verificationCode;
};

module.exports = mongoose.model("User", UserSchema);
