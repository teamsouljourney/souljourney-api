"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Appointment = require("../models/appointment");
const TherapistTimeTable = require("../models/therapistTimeTable");
const CustomError = require("../errors/customError");

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

  create: async (req, res, next) => {
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

    const now = new Date();
    const selectedDateTime = new Date(startTime);

    const nowUTC = new Date(now.toISOString());

    if (selectedDateTime < nowUTC) {
      throw new CustomError(
        "You cannot create an appointment for past dates or times.",
        400
      );
    }

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
      throw new CustomError(
        "You already have an appointment at this time with another therapist.",
        400
      );
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
      throw new CustomError(
        "This time slot is already booked. Please select another time.",
        400
      );
    }

    const newAppointment = await Appointment.create(req.body);

    const therapistTimeTable = await TherapistTimeTable.findOne({
      therapistId,
    });

    if (therapistTimeTable) {
      therapistTimeTable.unavailableDates.push({
        date: appointmentDate,
        startTime,
        endTime,
      });
      await therapistTimeTable.save();
    } else {
      await TherapistTimeTable.create({
        therapistId,
        unavailableDates: [{ date: appointmentDate, startTime, endTime }],
      });
    }

    if (!newAppointment) {
      throw new CustomError("Failed to create appointment.", 500);
    }

    res.status(201).json({
      error: false,
      message: "Appointment created successfully.",
      data: newAppointment,
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

    const { id } = req.params;
    const { userId, therapistId, appointmentDate, startTime, endTime } = req.body;

    // appointmentDate, startTime ve endTime'in Date objesi olduğundan emin olalım
    const appointmentDateObj = new Date(appointmentDate);
    const startTimeObj = new Date(startTime);
    const endTimeObj = new Date(endTime);

    // Existing appointment check (for update)
    const existingAppointment = await Appointment.findOne({
      userId,
      appointmentDate,
      _id: { $ne: id }, // Exclude the current appointment (update scenario)
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
      ],
    });

    if (existingAppointment) {
      return res.status(400).send({
        error: true,
        message:
          "You already have an appointment at this time with another therapist.",
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res
        .status(404)
        .send({ error: true, message: "Appointment not found." });
    }

    const therapistTimeTable = await TherapistTimeTable.findOne({
      therapistId: therapistId,
    });

    if (therapistTimeTable) {
      const formatDateTime = (date) => date.toISOString().slice(0, 16);

      therapistTimeTable.unavailableDates =
        therapistTimeTable.unavailableDates.filter((date) => {
          const isSameDate =
            date.date.toISOString().slice(0, 10) ===
            appointmentDateObj.toISOString().slice(0, 10);
          const isSameStartTime =
            formatDateTime(date.startTime) === formatDateTime(startTimeObj);
          const isSameEndTime =
            formatDateTime(date.endTime) === formatDateTime(endTimeObj);

          return !(isSameDate && isSameStartTime && isSameEndTime);
        });

      therapistTimeTable.unavailableDates.push({
        date: appointmentDateObj,
        startTime: startTimeObj,
        endTime: endTimeObj,
      });

      await therapistTimeTable.save();
    }

    res.status(202).send({
      error: false,
      data: updatedAppointment,
      new: await Appointment.findById(id),
    });
  },

  deleteAppointment: async (req, res) => {
    /* 
        #swagger.tags = ["Appointment"]
        #swagger.summary = "Delete Appointment"
    */
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      throw new CustomError("Appointment not found.", 404);
    }

    const data = await Appointment.deleteOne({ _id: req.params.id });
    if (!data.deletedCount) {
      throw new CustomError("Failed to delete appointment.", 500);
    }

    const therapistTimeTable = await TherapistTimeTable.findOne({
      therapistId: appointment.therapistId,
    });

    if (therapistTimeTable) {
      const formatDateTime = (date) => date.toISOString().slice(0, 16);

      therapistTimeTable.unavailableDates =
        therapistTimeTable.unavailableDates.filter((date) => {
          const isSameDate =
            date.date.toISOString().slice(0, 10) ===
            appointment.appointmentDate.toISOString().slice(0, 10);
          const isSameStartTime =
            formatDateTime(date.startTime) ===
            formatDateTime(appointment.startTime);
          const isSameEndTime =
            formatDateTime(date.endTime) ===
            formatDateTime(appointment.endTime);

          return !(isSameDate && isSameStartTime && isSameEndTime);
        });

      await therapistTimeTable.save();
    }

    return res.status(200).json({
      error: false,
      message: "Appointment deleted successfully.",
    });
  },
};
