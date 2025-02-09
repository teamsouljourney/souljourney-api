"use strict";

const { mongoose } = require("../configs/dbConnection");

const FeedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },
  },
  {
    collection: "feedbacks",
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
