"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

// Chat Controllers:

const Chat = require("../models/chat");
const User = require("../models/user");

module.exports = {
  accessChat: async (req, res) => {
    /* 
            #swagger.tags = ["Chat"]
            #swagger.summary = "List Chats"
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
    const { userId } = req.body;
    if (!userId) {
      throw new Error(400, "User ID is required");
    }

    const isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName lastName image email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "password"
        );
        res.status(200).send(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  },
  create: async (req, res) => {
    /* 
            #swagger.tags = ["Chat"]
            #swagger.summary = "Create Chat"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Chat"
                }
            }
        */

    const data = await Chat.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },

  read: async (req, res) => {
    /* 
            #swagger.tags = ["Chat"]
            #swagger.summary = "Read Chat"
        */

    const data = await Chat.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ["Chat"]
            #swagger.summary = "Update Chat"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Chat"
                }
            }
        */

    const data = await Chat.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(200).send({
      error: false,
      body: req.body,
      data,
      new: await Chat.findOne({ _id: req.params.id }),
    });
  },

  deleteChat: async (req, res) => {
    /* 
            #swagger.tags = ["Chat"]
            #swagger.summary = "Delete Chat"
        */

    const data = await Chat.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
