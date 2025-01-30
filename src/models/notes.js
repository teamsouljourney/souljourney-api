"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

const NotesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: [true, "User ID is required"],
      index: true,
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content is required"],
    },
  },
  {
    collection: "notes",
    timestamps: true 
  }
);

/* ------------------------------------------------- */

module.exports = mongoose.model("Notes", NotesSchema);
