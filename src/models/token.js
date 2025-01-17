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
      required: [true, "User ID is required"],
      index: true,
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
