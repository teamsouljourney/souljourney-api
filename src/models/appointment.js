"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

/* ------------------------------------------------- */

const AppointmentSchema = new mongoose.Schema(
  {
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
    appointmentDate: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    videoCallUrl: {
      type: String,
      default: null,
    },
  },
  {
    collection: "appointments",
    timestamps: true,
  }
);

/* ------------------------------------------------- */

module.exports = mongoose.model("Appointment", AppointmentSchema);
