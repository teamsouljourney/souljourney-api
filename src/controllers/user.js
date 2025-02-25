"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const { signVerificationToken } = require("../helpers/jwtFunctions");
const sendEmail = require("../helpers/sendEmail");
const CustomError = require("../errors/customError");
const filterObj = require("../helpers/allowedFields");

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

    if (!req.user.isAdmin) customFilter = { _id: req.user._id };

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

    const message = `Click the following link to verify your email address: ${verificationUrl}`;

    await sendEmail({
      email: newUser.email,
      subject: "Verify Your Email",
      message,
    });

    res.status(200).send({
      error: false,
      message: "A verification email has been sent to user's email address.",
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
        message: "User not found.",
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
      message: "User updated successfully!",
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
        ? "User deleted successfully!"
        : "User not found!",
      data,
    });
  },
  changeUserStatus: async (req, res) => {
    /* 
        #swagger.tags = ["Users"]
        #swagger.summary = "Change User Status"
    */

    const userId = req.user.isAdmin ? req.params.id : req.user._id
    
    const user = await User.findOne({ _id: userId });
    

    if (!user) {
      return res.status(404).send({
        error: true,
        message: "User not found.",
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).send({
      error: false,
      message: `User is now ${user.isActive ? "active" : "disabled"}.`,
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
    
    const filteredObj = filterObj(req.body, 
      'firstName', 
      'lastName', 
      'image', 
      'phone',
      'address',
      'profession'
    );
    console.log(filteredObj);
    
    const data = await User.updateOne({ _id: req.params.id }, filteredObj, {
      runValidators: true,
    });

    res.status(201).send({
      error: !data.modifiedCount,
      message: "User updated successfully!",
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
                "userName": "test",
                "email": "test@site.com",
                "firstName": "test",
                "lastName": "test",
            }
        }
    */

    const {currentPassword, newPassword, retypePassword} = req.body

    if (!currentPassword || !newPassword || !retypePassword) {
      throw new CustomError("currentPassword, newPassword and retypePassword are required! ")
    }

    const user = await User.findOne({_id: req.user._id})

    if (!user) {
      throw new CustomError("User not found", 404)
    }

    // console.log(user);

    const isPasswordCorrect = await user.correctPassword(currentPassword, user?.password)
    
    if (!isPasswordCorrect) {
      throw new CustomError("Your current password is not correct", 401)
    }

    if (newPassword !== retypePassword) {
      throw new CustomError("Passwords don't match!", 401)
    }
    
    user.password = newPassword

    await user.save()

    res.status(201).send({
      error: false,
      message: "Password changed successfully",
      data: user
    })
  }
};
