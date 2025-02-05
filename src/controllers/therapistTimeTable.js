"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Appointment = require("../models/appointment");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Appointment, {}, "therapistId");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Appointment),
      data,
    });
  },

  create: async (req, res) => {
    const data = await Appointment.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Appointment.findOne({ _id: req.params.id }).populate(
      "userId therapistId"
    );
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Appointment.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Appointment.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    const data = await Appointment.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
