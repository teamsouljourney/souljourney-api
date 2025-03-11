"use strict";

const Notification = require("../models/notification");

module.exports = {
  list: async (req, res) => {
    const { isTherapist } = req.user;

    const populateField = isTherapist ? "therapistId" : "userId";

    const data = await Notification.find().populate(populateField);

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    const { isTherapist } = req.user;
    const { id, ...notificationData } = req.body;

    const payload = {
      ...notificationData,
      ...(isTherapist ? { therapistId: id } : { userId: id }),
    };

    const data = await Notification.create(payload);

    console.log(data);

    res.status(201).send({
      error: false,
      data,
    });
  },

  isRead: async (req, res) => {
    const data = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { isRead: true },
      { new: true }
    );

    res.status(200).send({
      error: false,
      data,
    });
  },
};
