"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

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
    isTherapist: {
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
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
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

UserSchema.plugin(uniqueValidator, {
  message: "This {PATH} is exist",
});

// Hash the password before saving the user to the database
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods.markAsVerified = markAsVerified;
UserSchema.methods.correctPassword = comparePassword;
UserSchema.methods.createPasswordResetToken = createPasswordResetToken;
UserSchema.methods.createVerificationCode = createVerificationCode;

module.exports = mongoose.model("User", UserSchema);
