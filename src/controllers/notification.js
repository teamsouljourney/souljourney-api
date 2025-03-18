"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Notification = require("../models/notification");
const CustomError = require("../errors/customError");
const translations = require("../../locales/translations");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Notifications"]
      #swagger.summary = "List Notifications"
      #swagger.description = `
        You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
        <ul> Examples:
          <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
          <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
          <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
          <li>URL/?<b>limit=10&page=1</b></li>
        </ul>
      `
    */

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
    /*
      #swagger.tags = ["Notifications"]
      #swagger.summary = "Create Notification"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $ref: "#/definitions/Notification"
        }
      }
    */

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
    /*
      #swagger.tags = ["Notifications"]
      #swagger.summary = "Read Notifications by Receiver"
      #swagger.parameters['recieverId'] = {
        in: 'query',
        description: 'ID of the receiver',
        required: true
      }
      #swagger.parameters['recieverModel'] = {
        in: 'query',
        description: 'Model type of the receiver (Therapist or User)',
        required: true,
        enum: ['Therapist', 'User']
      }
    */

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
    /*
      #swagger.tags = ["Notifications"]
      #swagger.summary = "Mark Notification as Read"
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Notification ID',
        required: true
      }
    */

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

  deleteNotification: async (req, res) => {
    /*
      #swagger.tags = ["Notifications"]
      #swagger.summary = "Delete Notification"
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'Notification ID',
        required: true
      }
    */

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
