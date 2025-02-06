"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      default: null,
      index: true,
    },
    userType: {
      type: String,
      enum: ["User", "Therapist"],
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: [true, "Token is required"],
      index: true,
    },
  },
  { collection: "tokens", timestamps: true }
);

/* ------------------------------------------------- */

module.exports = mongoose.model("Token", TokenSchema);
