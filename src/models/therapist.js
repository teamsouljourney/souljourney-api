"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require('../helpers/passwordEncrypt')


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
            validate(email) {
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                    throw new Error("Invalid email address");
                }
            }
        },
        password:{
            type:String,
            required:true,
            trim:true,
            required: true,
            set: (password) => passwordEncrypt(password),
            validate(password) {
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
                    throw new Error("Password must be at least 8 characters long and contain at least one letter and one number");
                }
            },  
        },
        image: {
            type: String, // URL olarak saklanacak
            default: '' // Varsayılan resim URL'si
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

module.exports = mongoose.model("Therapist ", TherapistSchema);