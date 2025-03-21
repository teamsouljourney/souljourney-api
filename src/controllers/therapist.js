"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const filterObj = require("../helpers/allowedFields");
const Therapist = require("../models/therapist");
const CustomError = require("../errors/customError");
const translations = require("../../locales/translations");
const Appointment = require("../models/appointment");
const TherapistTimeTable = require("../models/therapistTimeTable");
const {
  s3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("../middlewares/upload");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Therapists"]
        #swagger.summary = "List Therapists"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    let customFilter = {};

    if (req.query?.category) {
      customFilter = { categoryId: req.query.category };
    }

    const data = await res.getModelList(Therapist, customFilter, [
      "categoryId",
      "feedbackId",
    ]);

    res.status(200).send({
      error: false,
      message: req.t(translations.therapist.listSuccess),
      details: await res.getModelListDetails(Therapist, customFilter),
      data,
    });
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Create Therapist"
        #swagger.description = "Create a new therapist entry with their details."
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    firstName: { type: 'string', example: 'Mehmet' },
                    lastName: { type: 'string', example: 'Yılmaz' },         
                    email: { type: 'string', example: 'mehmet.yilmaz@example.com' },
                    password: { type: 'string', example: 'Password123!' },
                    image: { type: 'string', example: 'https://example.com/mehmet.jpg' },
                    categoryId: { type: 'string', example: '67a475aeb6da7c1f21194622' '67a47634b6da7c1f21194632' },
                    description: { type: 'string', example: 'Experienced psychologist specializing in mental health.' },
                    experince: { type: 'string', example: '7 yrs in practice Stress, Anxiety, Addictions, Family conflicts,Self esteem, Motivation, Additional areas of focus: Grief, Intimacy-related issues, Eating disorders, Sleeping disorders, Parenting issues, Anger management, ADHD, Clinical approaches: Client-Centered Therapy' },
                    graduation: { type: 'string', example: 'Marmara University' },
                    isActive: { type: 'boolean', example: true },
                }
            }
        }
    */

    const data = await Therapist.create(req.body);

    res.status(201).send({
      error: false,
      message: req.t(translations.therapist.createSuccess),
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Get Single Therapist"
    */
    const data = await Therapist.findOne({ _id: req.params.id }).populate([
      "categoryId",
      "feedbackId",
    ]);

    if (!data) {
      return res.status(404).send({
        error: true,
        message: req.t(translations.therapist.notFound),
      });
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.therapist.readSuccess),
      data,
    });
  },
  update: async (req, res) => {
    /*
      #swagger.tags = ["Therapists"]
      #swagger.summary = "Update Therapist"
      #swagger.description = "This endpoint allows you to update the therapist's information, including their personal details, description, image, and category."
      #swagger.parameters['id'] = {
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          type: 'object',
          properties: {
            firstName: { type: 'string', example: 'Mehmet' },
            lastName: { type: 'string', example: 'Yılmaz' },
            email: { type: 'string', example: 'mehmet.yilmaz@example.com' },
            password: { type: 'string', example: 'Password123!' },
            image: { type: 'string', example: 'https://example.com/mehmet.jpg' },
            categoryId: { type: 'string', example: '67a475aeb6da7c1f21194622' },
            description: { type: 'string', example: 'Experienced psychologist specializing in mental health.' },
            isActive: { type: 'boolean', example: true },
            },
        },
      }
    */

    const { _id, password, ...updatedData } = req.body;

    const data = await Therapist.updateOne(
      { _id: req.params.id },
      updatedData,
      {
        runValidators: true,
      }
    );

    res.status(202).send({
      error: false,
      message: req.t(translations.therapist.updateSuccess),
      data,
      new: await Therapist.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
      #swagger.tags = ["Therapists"]
      #swagger.summary = "Delete Therapist"
    */

    const data = await Therapist.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? req.t(translations.therapist.deleteSuccess)
        : req.t(translations.therapist.notFound),
      data,
    });
  },
  changeTherapistStatus: async (req, res) => {
    /* 
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Change Therapist Status"
    */
    const therapist = await Therapist.findOne({ _id: req.params.id });

    if (!therapist) {
      return res.status(404).send({
        error: true,
        message: req.t(translations.therapist.notFound),
      });
    }

    therapist.isActive = !therapist.isActive;
    await therapist.save();

    if (!therapist.isActive) {
      // Delete all appointments related to the therapist
      await Appointment.deleteMany({ therapistId: therapist._id });
      await TherapistTimeTable.deleteOne({ therapistId: therapist._id });
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.therapist.statusChanged, {
        status: therapist.isActive
          ? req.t(translations.therapist.statusActive)
          : req.t(translations.therapist.statusDisabled),
      }),
      data: therapist,
    });
  },
  updateMe: async (req, res) => {
    /*
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Update Therapist"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "firstName": "test",
                "lastName": "test",
                "image": "test",
                "description": "test",
                "experience": "test",
                "graduation": "test"
            }
        }
    */

    const filteredObj = filterObj(
      req.body,
      "firstName",
      "lastName",
      "image",
      "description",
      "experience",
      "graduation",
      "categoryId"
    );

    const data = await Therapist.updateOne(
      { _id: req.params.id },
      filteredObj,
      {
        runValidators: true,
      }
    );

    res.status(201).send({
      error: !data.modifiedCount,
      message: data.modifiedCount
        ? req.t(translations.therapist.updateSuccess)
        : req.t(translations.therapist.updateFailed),
      data,
      new: await Therapist.findOne({ _id: req.params.id }),
    });
  },
  changeMyPassword: async (req, res) => {
    /* 
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Update Therapist"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "currentPassword": "***",
                "newPassword": "***",
                "retypePassword": "***",
            }
        }
    */

    const { currentPassword, newPassword, retypePassword } = req.body;

    if (!currentPassword || !newPassword || !retypePassword) {
      throw new CustomError(
        req.t(translations.therapist.passwordFieldsRequired),
        400
      );
    }

    const therapist = await Therapist.findOne({ _id: req.user._id });

    if (!therapist) {
      throw new CustomError(req.t(translations.therapist.notFound), 404);
    }

    const isPasswordCorrect = await therapist.correctPassword(
      currentPassword,
      therapist?.password
    );

    if (!isPasswordCorrect) {
      throw new CustomError(
        req.t(translations.therapist.currentPasswordIncorrect),
        401
      );
    }

    if (newPassword !== retypePassword) {
      throw new CustomError(
        req.t(translations.therapist.passwordsDontMatch),
        400
      );
    }

    therapist.password = newPassword;

    await therapist.save();

    res.status(200).send({
      error: false,
      message: req.t(translations.therapist.passwordChangeSuccess),
      data: therapist,
    });
  },

  uploadProfilePicture: async (req, res) => {
    /* 
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Upload Therapist Profile Picture"
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['image'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Therapist profile picture'
        }
    */

    // Check if file exists
    if (!req.file) {
      throw new CustomError(req.t(translations.therapist.noFileUploaded), 400);
    }

    const therapistId = req.params.id;

    // Find the therapist
    const therapist = await Therapist.findOne({ _id: therapistId });

    if (!therapist) {
      throw new CustomError(req.t(translations.therapist.notFound), 404);
    }

    // If therapist already has an image stored in S3, delete it
    if (therapist.image && therapist.image.includes("amazonaws.com")) {
      try {
        // Extract Key from S3 URL
        const s3Url = new URL(therapist.image);
        const key = s3Url.pathname.substring(1); // Remove leading slash

        // Delete old image from S3
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
          })
        );
      } catch (error) {
        console.error("Error deleting old image from S3:", error);
      }
    }

    // Create filename (replace spaces with hyphens)
    const fileName = `therapists/${therapistId}/profile-pictures/${Date.now()}_${req.file.originalname.replace(
      /\s+/g,
      "-"
    )}`;

    // S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    // Upload file to S3
    await s3Client.send(new PutObjectCommand(params));

    // Generate file URL
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Update therapist information
    therapist.image = imageUrl;
    await therapist.save();

    res.status(200).send({
      error: false,
      message: req.t(translations.therapist.profilePictureUploaded),
      data: {
        imageUrl,
      },
    });
  },
};
