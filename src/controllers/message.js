"use strict";

const Message = require("../models/message");

module.exports = {
  getMessages: async (req, res) => {
    /*
          #swagger.tags = ["Messages"]
          #swagger.summary = "List Messages"
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

    const { userId, userModel, chatWithId, chatWithModel } = req.query;

    if (
      !["Therapist", "User"].includes(userModel) ||
      !["Therapist", "User"].includes(chatWithModel)
    ) {
      return res
        .status(400)
        .send({ error: true, message: "Invalid user type" });
    }

    const messages = await Message.find({
      $or: [
        {
          senderId: userId,
          senderModel: userModel.toString(),
          recieverId: chatWithId,
          recieverModel: chatWithModel.toString(),
        },
        {
          senderId: chatWithId,
          senderModel: chatWithModel.toString(),
          recieverId: userId,
          recieverModel: userModel.toString(),
        },
      ],
    })
      .populate("senderId")
      .populate("recieverId");

    res.status(200).send({
      error: false,
      data: messages,
    });
  },
  sendMessage: async (req, res) => {
    /*
      #swagger.tags = ["Messages"]
      #swagger.summary = "Create Message"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $ref: "#/definitions/Message"
        }
      }
    */

    //Set userId from logged in user:
    req.body.senderId = req.user._id;

    const { senderModel, recieverModel } = req.body;
    if (
      !["Therapist", "User"].includes(senderModel) ||
      !["Therapist", "User"].includes(recieverModel)
    ) {
      throw new Error(400, "Unvalid user");
    }

    const message = await Message.create(req.body);

    res.status(201).send({
      error: false,
      data: message,
    });
  },
  markAsSeen: async (req, res) => {
    /*
      #swagger.tags = ["Messages"]
      #swagger.summary = "Mark As Seen"
    */

    const { messageId } = req.body;

    const data = await Message.findByIdAndUpdate(messageId, { seen: true });

    res.status(200).send({
      error: false,
      data,
    });
  },
  deleteMessage: async (req, res) => {
    /*
      #swagger.tags = ["Messages"]
      #swagger.summary = "Delete Message"
    */

    const data = await Message.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
