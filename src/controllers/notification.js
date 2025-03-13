"use strict";

const Notification = require("../models/notification");

module.exports = {
  list: async (req, res) => {
    const { userId, userModel, recieverNotId, recieverNotModel } = req.query;

    if (
      !["Therapist", "User"].includes(userModel) ||
      !["Therapist", "User"].includes(recieverNotModel)
    ) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid user type" });
    }

    const data = await Notification.find({
      $or: [
        {
          senderId: userId,
          senderModel: userModel.toString(),
          recieverId: recieverNotId,
          recieverModel: recieverNotModel.toString(),
        },
        {
          senderId: recieverNotId,
          senderModel: recieverNotModel.toString(),
          recieverId: userId,
          recieverModel: userModel.toString(),
        },
      ],
    })
      .populate("senderId")
      .populate("recieverId");

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    const userId = req.params.userId;

    const notifications = await Notification.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      error: false,
      message: "Notifications retrieved successfully",
      data: notifications,
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
