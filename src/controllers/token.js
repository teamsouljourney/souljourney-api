"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ['Token']
            #swagger.summary = 'Get all tokens'
            #swagger.description = 'Fetch a list of all tokens with optional userId population.'
        */

    const data = await res.getModelList(Token, {}, "userId");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ['Token']
            #swagger.summary = 'Create a new token'
            #swagger.description = 'Create and save a new token in the database.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Token data to create.',
                schema: {
                  userId: 'string',
                  token: 'string',
                },
            }
        */

    const data = await Token.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ['Token']
            #swagger.summary = 'Get token by ID'
            #swagger.description = 'Fetch a token by its unique ID and populate the userId field.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the token to retrieve.',
                type: 'string',
            }
        */

    const data = await Token.findOne({ _id: req.params.id }).populate("userId");

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ['Token']
            #swagger.summary = 'Update token by ID'
            #swagger.description = 'Update a token\'s details by its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the token to update.',
                type: 'string',
            }
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Updated token data.',
                schema: {
                  userId: 'string',
                  token: 'string',
                },
            }
          
  
        */

    const data = await Token.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Token.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ['Token']
            #swagger.summary = 'Delete token by ID'
            #swagger.description = 'Delete a token from the database by its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the token to delete.',
                type: 'string',
            }
        */

    const data = await Token.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
