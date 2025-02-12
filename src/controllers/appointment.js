"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Appointment = require("../models/appointment");
const TherapistTimeTable = require("../models/therapistTimeTable");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ['Appointment']
        #swagger.summary = 'Get all appointments'
        #swagger.description = 'Fetch a list of all appointments, with optional userId and therapistId population.'
    */
    const data = await res.getModelList(Appointment, {}, [
      "userId therapistId",
    ]);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Appointment),
      data,
    });
  },

  getUserAppointments: async (req, res) => {
    /*
          #swagger.tags = ['Appointment']
          #swagger.summary = 'Get user or therapist appointments'
          #swagger.description = 'Fetch a list of appointments for a specific user or therapist, based on their role.'
          #swagger.parameters['id'] = {
              in: 'path',
              required: true,
              description: 'ID of the user or therapist to fetch appointments for.',
              type: 'string',
          }
    */

    const { id } = req.params;
    const { isTherapist } = req.user;

    // console.log(isTherapist, id);

    if (isTherapist) {
      const appointments = await Appointment.find({ therapistId: id }).populate(
        "userId therapistId"
      );

      return res.status(200).json({
        error: false,
        data: appointments,
      });
    }

    const appointments = await Appointment.find({ userId: id }).populate(
      "userId therapistId"
    );

    res.status(200).json({
      error: false,
      data: appointments,
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
                  startTime: 'date',
                  endTime: 'date',
              },
          }
    */

    const { userId, therapistId, appointmentDate, startTime, endTime } =
      req.body;

    const userExistingAppointment = await Appointment.findOne({
      userId,
      appointmentDate,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (userExistingAppointment) {
      return res.status(400).json({
        error: true,
        message:
          "You already have an appointment at this time with another therapist.",
      });
    }

    const existingAppointment = await Appointment.findOne({
      therapistId,
      appointmentDate,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (existingAppointment) {
      return res.status(400).json({
        error: true,
        message:
          "This time slot is already booked. Please select another time.",
      });
    }

    const newAppointment = await Appointment.create(req.body);

    // Check if therapist's timetable already exists
    const therapistTimeTable = await TherapistTimeTable.findOne({
      therapistId,
    });

    if (therapistTimeTable) {
      // If timetable exists, update the unavailableDate array
      therapistTimeTable.unavailableDates.push({
        date: appointmentDate,
        startTime: startTime,
        endTime: endTime,
      });
      await therapistTimeTable.save();
    } else {
      // If timetable doesn't exist, create a new one
      const newUnavailableDate = {
        therapistId,
        unavailableDates: [
          {
            date: appointmentDate,
            startTime: startTime,
            endTime: endTime,
          },
        ],
      };
      await TherapistTimeTable.create(newUnavailableDate);
    }

    if (newAppointment) {
      return res.status(201).json({
        error: false,
        message: "Appointment created successfully.",
        data: newAppointment,
      });
    }

    return res.status(500).json({
      error: true,
      message: "Failed to create appointment.",
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

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        error: true,
        message: "Appointment not found.",
      });
    }

    const data = await Appointment.deleteOne({ _id: req.params.id });
    if (!data.deletedCount) {
      return res.status(500).json({
        error: true,
        message: "Failed to delete appointment.",
      });
    }

    const therapistTimeTable = await TherapistTimeTable.findOne({
      therapistId: appointment.therapistId,
    });

    if (therapistTimeTable) {
      therapistTimeTable.unavailableDates =
        therapistTimeTable.unavailableDates.filter(
          (date) =>
            !(
              date.date.toISOString() ===
                appointment.appointmentDate.toISOString() &&
              date.startTime.toISOString() ===
                appointment.startTime.toISOString() &&
              date.endTime.toISOString() === appointment.endTime.toISOString()
            )
        );

      await therapistTimeTable.save();
    }

    return res.status(200).json({
      error: false,
      message: "Appointment deleted successfully.",
    });
  },
};
