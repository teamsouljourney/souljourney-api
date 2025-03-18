"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderModel: {
      type: String,
      enum: ["Therapist", "User"],
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    recieverModel: {
      type: String,
      enum: ["Therapist", "User"],
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    seen: { type: Boolean, default: false },
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
