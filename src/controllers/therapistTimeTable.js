"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const TherapistTimeTable = require("../models/therapistTimeTable");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ['TherapistTimeTable']
        #swagger.summary = 'Get all therapist time tables'
        #swagger.description = 'Fetch a list of all therapist time tables, with optional therapistId population.'
    */
    const data = await res.getModelList(TherapistTimeTable, {}, "therapistId");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(TherapistTimeTable),
      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ['TherapistTimeTable']
        #swagger.summary = 'Create a new therapist time table'
        #swagger.description = 'Create and save a new therapist time table in the database.'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            description: 'Therapist time table data to create.',
            schema: {
              therapistId: 'string',
              availableDates: [
                {
                  date: 'string (ISO format)',
                  startTime: 'string (HH:mm)',
                  endTime: 'string (HH:mm)'
                }
              ]
            }
        }
    */
    const data = await TherapistTimeTable.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
        #swagger.tags = ['TherapistTimeTable']
        #swagger.summary = 'Get therapist time table by ID'
        #swagger.description = 'Fetch a therapist time table by its unique ID.'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID of the therapist time table to retrieve.',
            type: 'string',
        }
    */
    const data = await TherapistTimeTable.findOne({
      _id: req.params.id,
    }).populate("therapistId");
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
        #swagger.tags = ['TherapistTimeTable']
        #swagger.summary = 'Update therapist time table by ID'
        #swagger.description = 'Update a therapist time table details by its unique ID.'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID of the therapist time table to update.',
            type: 'string',
        }
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            description: 'Updated therapist time table data.',
            schema: {
              therapistId: 'string',
              availableDates: [
                {
                  date: 'string (ISO format)',
                  startTime: 'string (HH:mm)',
                  endTime: 'string (HH:mm)'
                }
              ]
            }
        }
    */
    const data = await TherapistTimeTable.updateOne(
      { _id: req.params.id },
      req.body,
      { runValidators: true }
    );
    res.status(202).send({
      error: false,
      data,
      new: await TherapistTimeTable.findOne({ _id: req.params.id }),
    });
  },

  deleteTimeTable: async (req, res) => {
    /*
        #swagger.tags = ['TherapistTimeTable']
        #swagger.summary = 'Delete therapist time table by ID'
        #swagger.description = 'Delete a therapist time table from the database by its unique ID.'
        #swagger.parameters['id'] = {
            in: 'path',
            required: true,
            description: 'ID of the therapist time table to delete.',
            type: 'string',
        }
    */
    const data = await TherapistTimeTable.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
