"use strict";

const CustomError = require("../errors/customError");
const Appointment = require("../models/appointment");
const Feedback = require("../models/feedback");
const Therapist = require("../models/therapist");

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
    const userId = req.user._id
    req.body.userId = userId;

    const currentDate = new Date()

    const userEndedAppointment = await Appointment.findOne({
      userId,
      endTime: { $lte: currentDate }
    });

    // console.log(userEndedAppointment);

    if (!userEndedAppointment) {
      throw new CustomError('You can only provide feedback for this therapist if you have previously scheduled an appointment and completed it.', 400);
    }

    const data = await Feedback.create(req.body);

    // Pushing the feedbackId to the feedbackId array of the Therapist model

    const therapistData = await Therapist.findOne({
      _id: req.body.therapistId,
    });
    // console.log(therapistData);

    let feedbackId = therapistData?.feedbackId;
    // console.log(feedbackId);

    feedbackId.push(data._id);

    await therapistData.save();
    // console.log("therapistData-->", therapistData);

    res.status(201).send({
      error: false,
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

    res.status(200).send({
      error: false,
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

    res.status(202).send({
      error: false,
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

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
  getSingleTherapistFeedbacks: async (req, res) => {
    // console.log(req.params);

    const { therapistId } = req.params;

    const data = await Feedback.find({ therapistId }).populate([
      "userId",
      "therapistId",
    ]);

    // console.log(data);

    res.status(200).send({
      error: false,
      data,
    });
  },
};
