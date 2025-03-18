"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Notification = require("../models/notification");

module.exports = {
  list: async (req, res) => {
    const readNotifications = await Notification.find({ isRead: true }).sort({
      createdAt: -1,
    });

    const unreadNotifications = await Notification.find({ isRead: false }).sort(
      { createdAt: -1 }
    );

    const data = [...readNotifications, ...unreadNotifications];

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    const { content, recieverId, recieverModel, notificationType } = req.body;

    const data = await Notification.create({
      recieverId,
      recieverModel,
      notificationType,
      content,
    });

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const { recieverId, recieverModel } = req.query;

    if (!["Therapist", "User"].includes(recieverModel)) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid user type" });
    }

    const data = await Notification.find({
      recieverId,
      recieverModel,
    })
      .populate("recieverId")
      .sort({ createdAt: -1 });

    res.status(200).send({
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

  delete: async (req, res) => {
    const data = await Notification.deleteOne({
      _id: req.params.id,
    });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
