"use strict";

const { mongoose } = require("../configs/dbConnection");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderType: {
      type: String,
      enum: ["therapist", "patient"],
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recieverType: {
      type: String,
      enum: ["therapist", "patient"],
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
