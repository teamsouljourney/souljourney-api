"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");
const validator = require("validator");
const validatePassword = require("../helpers/validatePassword");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const {
  markAsVerified,
  comparePassword,
  createPasswordResetToken,
  createVerificationCode,
} = require("../helpers/methdodHelper");

const TherapistSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Email format is not valid"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      required: true,
      validate: {
        validator: validatePassword,
        message:
          "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
      },
    },
    image: {
      type: String,
      default: "",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationCode: Number,
    verificationCodeExpires: Date,
  },
  {
    collection: "therapists",
    timestamps: true,
  }
);

TherapistSchema.plugin(uniqueValidator, {
  message: "This {PATH} is exist",
});

TherapistSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

TherapistSchema.methods.markAsVerified = markAsVerified;
TherapistSchema.methods.correctPassword = comparePassword;
TherapistSchema.methods.createPasswordResetToken = createPasswordResetToken;
TherapistSchema.methods.createVerificationCode = createVerificationCode;

module.exports = mongoose.model("Therapist", TherapistSchema);
