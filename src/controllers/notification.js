"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Notification = require("../models/notification");
const CustomError = require("../errors/customError");
const translations = require("../../locales/translations");

module.exports = {
  list: async (req, res) => {
    const readNotifications = await Notification.find({ isRead: true }).sort({
      createdAt: -1,
    });

    const unreadNotifications = await Notification.find({ isRead: false }).sort(
      { createdAt: -1 }
    );

    const data = [...unreadNotifications, ...readNotifications];

    res.status(200).send({
      error: false,
      message: req.t(translations.notification.listSuccess),
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
      message: req.t(translations.notification.createSuccess),
      data,
    });
  },

  read: async (req, res) => {
    const { recieverId, recieverModel } = req.query;

    if (!["Therapist", "User"].includes(recieverModel)) {
      throw new CustomError(
        req.t(translations.notification.invalidUserType),
        400
      );
    }

    const data = await Notification.find({
      recieverId,
      recieverModel,
    })
      .populate("recieverId")
      .sort({ createdAt: -1 });

    res.status(200).send({
      error: false,
      message: req.t(translations.notification.readSuccess),
      data,
    });
  },

  isRead: async (req, res) => {
    const data = await Notification.findOneAndUpdate(
      { _id: req.params.id },
      { isRead: true },
      { new: true }
    );

    if (!data) {
      throw new CustomError(req.t(translations.notification.notFound), 404);
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.notification.markAsReadSuccess),
      data,
    });
  },

  delete: async (req, res) => {
    const data = await Notification.deleteOne({
      _id: req.params.id,
    });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? req.t(translations.notification.deleteSuccess)
        : req.t(translations.notification.notFound),
      data,
    });
  },
};
