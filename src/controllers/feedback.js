"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const CustomError = require("../errors/customError");
const Appointment = require("../models/appointment");
const Feedback = require("../models/feedback");
const Therapist = require("../models/therapist");
const translations = require("../../locales/translations");

module.exports = {
  list: async (req, res) => {
    /*
      #swagger.tags = ["Feedbacks"]
      #swagger.summary = "List Feedbacks"
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
    const data = await res.getModelList(Feedback, {}, [
      "userId",
      "therapistId",
    ]);

    res.status(200).send({
      error: false,
      message: req.t(translations.feedback.listSuccess),
      details: await res.getModelListDetails(Feedback),
      data,
    });
  },
  create: async (req, res) => {
    /*
      #swagger.tags = ["Feedbacks"]
      #swagger.summary = "Create Feedback"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $ref: "#/definitions/Feedback"
        }
      }
    */

    //Set userId from logged in user:
    const userId = req.user._id;
    req.body.userId = userId;

    const currentDate = new Date();

    const userEndedAppointment = await Appointment.findOne({
      userId,
      endTime: { $lte: currentDate },
    });

    if (!userEndedAppointment) {
      throw new CustomError(req.t(translations.feedback.noAppointment), 400);
    }

    const data = await Feedback.create(req.body);

    // Pushing the feedbackId to the feedbackId array of the Therapist model
    const therapistData = await Therapist.findOne({
      _id: req.body.therapistId,
    });

    const feedbackId = therapistData?.feedbackId;

    feedbackId.push(data._id);

    await therapistData.save();

    res.status(201).send({
      error: false,
      message: req.t(translations.feedback.createSuccess),
      data,
    });
  },
  read: async (req, res) => {
    /*
      #swagger.tags = ["Feedbacks"]
      #swagger.summary = "Get Single Feedback"
    */

    const data = await Feedback.findOne({ _id: req.params.id }).populate([
      "userId",
      "therapistId",
    ]);

    if (!data) {
      throw new CustomError(req.t(translations.feedback.notFound), 404);
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.feedback.readSuccess),
      data,
    });
  },
  update: async (req, res) => {
    /*
      #swagger.tags = ["Feedbacks"]
      #swagger.summary = "Update Feedback"
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $ref: "#/definitions/Feedback"
        }
      }
    */

    const data = await Feedback.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if (data.matchedCount === 0) {
      throw new CustomError(req.t(translations.feedback.notFound), 404);
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.feedback.updateSuccess),
      data,
      newFeedback: await Feedback.findOne({ _id: req.params.id }),
    });
  },
  deleteFeedback: async (req, res) => {
    /*
      #swagger.tags = ["Feedbacks"]
      #swagger.summary = "Delete Feedback"
    */

    const data = await Feedback.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 200 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? req.t(translations.feedback.deleteSuccess)
        : req.t(translations.feedback.notFound),
      data,
    });
  },
  getSingleTherapistFeedbacks: async (req, res) => {
    /*
      #swagger.tags = ["Feedbacks"]
      #swagger.summary = "Get Single Therapist Feedbacks"
      #swagger.description = "Fetch all feedback/reviews for a specific therapist."
      #swagger.parameters['therapistId'] = {
          in: 'path',
          required: true,
          description: 'ID of the therapist to fetch feedbacks for.',
          type: 'string',
        }
    */
    const { therapistId } = req.params;

    const data = await Feedback.find({ therapistId }).populate([
      "userId",
      "therapistId",
    ]);

    res.status(200).send({
      error: false,
      message: req.t(translations.feedback.getSingleTherapistSuccess),
      data,
    });
  },
};
