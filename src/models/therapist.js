"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require('../helpers/passwordEncrypt')
const uniqueValidator = require("mongoose-unique-validator");



const TherapistSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            required: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            required: true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            required: true,
            unique:true,
            validate: [
                // (email) => emailValidation(email),
                "Email format is not valid",
            ],
        },
        password:{
            type:String,
            required:true,
            trim:true,
            required: true,
            set: (password) => passwordEncrypt(password),
            validate: [
                // (password) => passwordValidation(password),
                // "Password format is not valid",
                ],
        },
        image: {
            type: String,
            default: '' 
        },

        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        feedbackId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
            required: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        collection: "therapists",
        timestamps: true,
      }
);
TherapistSchema.plugin(uniqueValidator, {
    message: "This {PATH} is exist",
  });

module.exports = mongoose.model("Therapist ", TherapistSchema);
