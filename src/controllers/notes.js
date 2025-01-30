"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Notes = require("../models/notes");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ["Notes"]
            #swagger.summary = "List Notes"
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

    const data = await res.getModelList(Notes, {}, ["userId", "therapistId"]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Notes),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ['Notes']
            #swagger.summary = 'Create a new notes'
            #swagger.description = 'Create and save a new notes in the database.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Notes data to create.',
                schema: {
                    content:'string',
                    userId: 'string',
                    therapistId: 'string',
                },
            }
        */

    const data = await Notes.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ['Notes']
            #swagger.summary = 'Get a note by ID'
            #swagger.description = 'Retrieve a specific note using its unique ID, with userId and therapistId populated.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'The ID of the note to retrieve.',
                type: 'string'
            }
        */

    const data = await Notes.findOne({ _id: req.params.id }).populate(["userId", "therapistId"]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ['Notes']
            #swagger.summary = 'Update notes by ID'
            #swagger.description = 'Update a notes details by its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the notes to update.',
                type: 'string',
            }
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Updated notes data.',
                schema: {
                  userId: 'string',
                  therapistId:'string',
                  content: 'string',
                },
            }
          
  
        */

    const data = await Notes.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Notes.findOne({ _id: req.params.id }),
    });
  },

  deleteToken: async (req, res) => {
    /*
            #swagger.tags = ['Notes']
            #swagger.summary = 'Delete a note by ID'
            #swagger.description = 'Remove a note from the database using its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'The ID of the note to delete.',
                schema: { type: 'string' }
            }
        */

    const data = await Notes.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
