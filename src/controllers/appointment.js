"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Appointment = require("../models/appointment");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ['Appointment']
        #swagger.summary = 'Get all appointments'
        #swagger.description = 'Fetch a list of all appointments, with optional userId and therapistId population.'
    */
    const data = await res.getModelList(Appointment, {}, "userId therapistId");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Appointment),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ['Appointment']
            #swagger.summary = 'Create a new appointment'
            #swagger.description = 'Create and save a new appointment in the database.'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Appointment data to create.',
                schema: {
                  userId: 'string',
                  therapistId: 'string',
                  appointmentDate: 'date',
                  endTime: 'date',
              },
          }
    */
    const data = await Appointment.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ['Appointment']
            #swagger.summary = 'Get appointment by ID'
            #swagger.description = 'Fetch an appointment by its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the appointment to retrieve.',
                type: 'string',
            }
      */
    const data = await Appointment.findOne({ _id: req.params.id }).populate(
      "userId therapistId"
    );
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ['Appointment']
            #swagger.summary = 'Update appointment by ID'
            #swagger.description = 'Update an appointment\'s details by its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the appointment to update.',
                type: 'string',
            }
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                description: 'Updated appointment data.',
                schema: {
                  userId: 'string',
                  therapistId: 'string',
                  appointmentDate: 'date',
                  endTime: 'date',
              },
          }
    */

    const data = await Appointment.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Appointment.findOne({ _id: req.params.id }),
    });
  },

  deleteAppointment: async (req, res) => {
    /*
            #swagger.tags = ['Appointment']
            #swagger.summary = 'Delete appointment by ID'
            #swagger.description = 'Delete an appointment from the database by its unique ID.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the appointment to delete.',
                type: 'string',
            }
    */
    const data = await Appointment.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
