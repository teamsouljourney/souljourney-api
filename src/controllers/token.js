"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Token = require("../models/token");
const translations = require("../../locales/translations");
const CustomError = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.ignore = true
    */

    const data = await res.getModelList(Token, {}, "userId");

    res.status(200).send({
      error: false,
      message: req.t(translations.token.listSuccess),
      details: await res.getModelListDetails(Token),
      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.ignore = true
    */

    const data = await Token.create(req.body);

    res.status(201).send({
      error: false,
      message: req.t(translations.token.createSuccess),
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.ignore = true
    */

    const data = await Token.findOne({ _id: req.params.id }).populate("userId");

    if (!data) {
      throw new CustomError(req.t(translations.token.notFound), 404);
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.token.readSuccess),
      data,
    });
  },

  update: async (req, res) => {
    /*
        #swagger.ignore = true
    */

    const data = await Token.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if (data.nModified === 0) {
      throw new CustomError(req.t(translations.token.notFound), 404);
    }

    res.status(202).send({
      error: false,
      message: req.t(translations.token.updateSuccess),
      data,
      new: await Token.findOne({ _id: req.params.id }),
    });
  },

  deleteToken: async (req, res) => {
    /*
        #swagger.ignore = true
    */

    const data = await Token.deleteOne({ _id: req.params.id });

    if (data.deletedCount === 0) {
      throw new CustomError(req.t(translations.token.notFound), 404);
    }

    res.status(204).send({
      error: false,
      message: req.t(translations.token.deleteSuccess),
      data,
    });
  },
};
