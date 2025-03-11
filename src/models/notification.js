"use strict";

const { mongoose } = require("../configs/dbConnection");

const NotificationSchema = new mongoose.Schema(
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
    },
    notificationType: {
      type: String,
      enum: ["appointment", "message", "reminder"],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "notifications",
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
