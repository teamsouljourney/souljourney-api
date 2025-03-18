"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const User = require("../models/user");
const { signVerificationToken } = require("../helpers/jwtFunctions");
const sendEmail = require("../helpers/sendEmail");
const CustomError = require("../errors/customError");
const filterObj = require("../helpers/allowedFields");
const translations = require("../../locales/translations");
const {
  verificationEmail,
} = require("../utils/emailTamplates/verificationEmail");
const {
  deleteAccountEmail,
} = require("../utils/emailTamplates/deleteAccountEmail");
const {
  changePasswordEmail,
} = require("../utils/emailTamplates/changePasswordEmail");
const Appointment = require("../models/appointment");
const TherapistTimeTable = require("../models/therapistTimeTable");

module.exports = {
  list: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "List Users"
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

    let customFilter = {};

    customFilter = { isAdmin: false };

    const data = await res.getModelList(User, customFilter);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User, customFilter),
      data,
    });
  },
  create: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Create User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "userName": "test",
                "password": "aA!123456",
                "email": "test@site.com",
                "firstName": "test",
                "lastName": "test",
            }
        }
    */

    const newUser = await User.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isVerified: false,
    });

    const verificationToken = signVerificationToken(newUser._id);

    const verificationUrl = `${process.env.SERVER_URL}/auth/verify-email?token=${verificationToken}`;

    const message = verificationEmail(newUser.userName, verificationUrl);

    await sendEmail({
      email: newUser.email,
      subject: req.t(translations.user.verificationEmailSubject),
      message,
    });

    res.status(200).send({
      error: false,
      message: req.t(translations.user.verificationEmailSent),
    });
  },
  read: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Read User"
    */

    const userId = req.user.isAdmin ? req.params.id : req.user._id;

    const data = await User.findOne({ _id: userId });

    if (!data) {
      return res.status(404).send({
        error: true,
        message: req.t(translations.user.notFound),
      });
    }

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "userName": "test",
                "email": "test@site.com",
                "firstName": "test",
                "lastName": "test",
            }
        }
    */

    const { _id, password, ...updatedData } = req.body;

    const data = await User.updateOne({ _id: req.params.id }, updatedData, {
      runValidators: true,
    });

    res.status(201).send({
      error: false,
      message: req.t(translations.user.updateSuccess),
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Delete User"
    */
    const data = await User.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? req.t(translations.user.deleteSuccess)
        : req.t(translations.user.notFound),
      data,
    });
  },
  changeUserStatus: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Change User Status"
    */

    const userId = req.user.isAdmin ? req.params.id : req.user._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({
        error: true,
        message: req.t(translations.user.notFound),
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    // If the user is deactivated:
    if (!user.isActive) {
      const appointments = await Appointment.find({ userId: user._id });

      // Delete all appointments related to the user
      await Appointment.deleteMany({ userId: user._id });
      for (const appointment of appointments) {
        await TherapistTimeTable.updateOne(
          { therapistId: appointment.therapistId },
          {
            $pull: {
              unavailableDates: {
                date: appointment.appointmentDate,
                startTime: appointment.startTime,
                endTime: appointment.endTime,
              },
            },
          }
        );
      }
    }

    const message = deleteAccountEmail(user.userName);

    await sendEmail({
      email: user.email,
      subject:
        "Your Soul Journey Account Has Been Deleted – Come Back to Soul Journey Anytime",
      message,
    });

    res.status(200).send({
      error: false,
      message: req.t(translations.user.statusChanged, {
        status: user.isActive
          ? req.t(translations.user.active)
          : req.t(translations.user.disabled),
      }),
      data: user,
    });
  },
  updateMe: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                "firstName": "test",
                "lastName": "test",
                "image": "test",
                "phone": "test",
                "address": "test",
                "profession": "test"
            }
        }
    */

    const filteredObj = filterObj(
      req.body,
      "firstName",
      "lastName",
      "image",
      "phone",
      "address",
      "profession"
    );
    console.log(filteredObj);

    const data = await User.updateOne({ _id: req.params.id }, filteredObj, {
      runValidators: true,
    });

    res.status(201).send({
      error: !data.modifiedCount,
      message: data.modifiedCount
        ? req.t(translations.user.updateSuccess)
        : req.t(translations.user.updateFailed),
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },
  changeMyPassword: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
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
      throw new CustomError(req.t(translations.user.passwordFieldsRequired));
    }

    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      throw new CustomError(req.t(translations.user.notFound), 404);
    }

    const isPasswordCorrect = await user.correctPassword(
      currentPassword,
      user?.password
    );

    if (!isPasswordCorrect) {
      throw new CustomError(
        req.t(translations.user.currentPasswordIncorrect),
        401
      );
    }

    if (newPassword !== retypePassword) {
      throw new CustomError(req.t(translations.user.passwordsDontMatch), 401);
    }

    user.password = newPassword;

    await user.save();

    const message = changePasswordEmail(user.userName);

    await sendEmail({
      email: user.email,
      subject: req.t(translations.user.passwordChangeSuccess), // "Password Changed",
      message,
    });

    res.status(201).send({
      error: false,
      message: req.t(translations.user.passwordChangeSuccess),
      data: user,
    });
  },

  uploadProfilePicture: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Upload User Profile Picture"
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['image'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'User profile picture'
        }
    */

    // Check if file exists
    if (!req.file) {
      return res.status(400).send({
        error: true,
        message: req.t(translations.user.noFileUploaded),
      });
    }

    const userId = req.params.id;

    // Find the user
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).send({
        error: true,
        message: req.t(translations.user.notFound),
      });
    }

    // If user already has an image that's stored in our uploads folder, delete it
    if (user.image && user.image.includes("_")) {
      const oldImagePath = `./uploads/${user.image.split("/").pop()}`;
      if (require("fs").existsSync(oldImagePath)) {
        require("fs").unlinkSync(oldImagePath);
      }
    }

    // Update user with new image path
    // The file name is already set by the multer middleware with timestamp
    const imageUrl = `/uploads/${req.file.filename}`;
    user.image = imageUrl;
    await user.save();

    res.status(200).send({
      error: false,
      message: req.t(translations.user.profilePictureUploaded),
      data: {
        imageUrl,
      },
    });
  },
};
