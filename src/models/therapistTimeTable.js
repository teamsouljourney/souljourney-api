"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

/* ------------------------------------------------- */

const TherapistTimeTableSchema = new mongoose.Schema(
  {
    therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },
    unavailableDate: [
      {
        date: { type: Date, required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
      },
    ],
  },
  {
    collection: "therapistTimeTables",
    timestamps: true,
  }
);

/* ------------------------------------------------- */

module.exports = mongoose.model("TherapistTimeTable", TherapistTimeTableSchema);
