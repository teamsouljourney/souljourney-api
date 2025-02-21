"use strict";

const { mongoose } = require("../configs/dbConnection");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
