"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const CustomError = require("../errors/customError");
const Notes = require("../models/notes");
const translations = require("../../locales/translations");

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
    // Get therapists's own notes.

    const therapistId = req.user._id;

    const customFilter = { therapistId: therapistId };

    const data = await res.getModelList(Notes, customFilter, [
      { path: "userId", select: "_id firstName lastName" },
      { path: "therapistId", select: "_id firstName lastName" },
    ]);
    res.status(200).send({
      error: false,
      message: req.t(translations.notes.listSuccess),
      details: await res.getModelListDetails(Notes),
      data,
    });
  },

  create: async (req, res) => {
    /*
      #swagger.tags = ['Notes']
      #swagger.summary = 'Create a new note'
      #swagger.description = 'Create and save a new note in the database.'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Notes data to create.',
          schema: {
              content: 'string',
              userId: 'string'
          }
      }
    */
    // Set therapistId from logged in therapist.

    req.body.therapistId = req.user._id;

    const data = await Notes.create(req.body);

    res.status(201).send({
      error: false,
      message: req.t(translations.notes.createSuccess),
      data,
    });
  },

  read: async (req, res) => {
    /*
      #swagger.tags = ['Notes']
      #swagger.summary = 'Get a note by ID'
      #swagger.description = 'Retrieve a specific note using its unique ID, with userId populated.'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          description: 'The ID of the note to retrieve.',
          type: 'string'
      }
    */
    // Just therapists notes
    const data = await Notes.findOne({
      _id: req.params.id,
      therapistId: req.user._id,
    }).populate(["userId", "therapistId"]);

    if (!data) {
      throw new CustomError(
        req.t(translations.notes.notFoundOrNoPermission),
        404
      );
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.notes.readSuccess),
      data,
    });
  },

  update: async (req, res) => {
    /*
      #swagger.tags = ['Notes']
      #swagger.summary = 'Update note by ID'
      #swagger.description = 'Update a note's details by its unique ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          description: 'ID of the note to update.',
          type: 'string'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Updated note data.',
          schema: {
              content: 'string'
          }
      }
    */
    // Sadece terapistin notunu güncelle
    const data = await Notes.updateOne(
      { _id: req.params.id, therapistId: req.user._id },
      req.body,
      {
        runValidators: true,
      }
    );

    if (data.modifiedCount === 0) {
      throw new CustomError(
        req.t(translations.notes.notFoundOrNoPermission),
        403
      );
    }

    res.status(200).send({
      error: !data.modifiedCount,
      message: req.t(translations.notes.updateSuccess),
      data,
      new: await Notes.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
      #swagger.tags = ['Notes']
      #swagger.summary = 'Delete a note by ID'
      #swagger.description = 'Remove a note from the database using its unique ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          description: 'The ID of the note to delete.',
          type: 'string'
      }
    */
    // Sadece terapistin notunu sil
    const data = await Notes.deleteOne({
      _id: req.params.id,
      therapistId: req.user._id,
    });

    res.status(data.deletedCount ? 200 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? req.t(translations.notes.deleteSuccess)
        : req.t(translations.notes.deletedOrNoPermission),
      data,
    });
  },

  getSingleUserNotes: async (req, res) => {
    /*
      #swagger.tags = ["Notes"]
      #swagger.summary = "Get Single Therapist Notes"
      #swagger.description = "Fetch all notes/reviews for a specific therapist."
      #swagger.parameters['therapistId'] = {
          in: 'path',
          required: true,
          description: 'ID of the user to fetch notes for.',
          type: 'string',
        }
    */

    const { userId } = req.params;

    const data = await Notes.find({ userId }).populate([
      "userId",
      "therapistId",
    ]);

    res.status(200).send({
      error: false,
      message: req.t(translations.notes.getSingleUserSuccess),
      data,
    });
  },
};
