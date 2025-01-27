"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const crypto = require("crypto");
const { mongoose } = require("../configs/dbConnection");
const validator = require("validator");
const validatePassword = require("../helpers/validatePassword");
const bcrypt = require("bcryptjs");
const resetTokenHash = require("../helpers/resetTokenHash");
const uniqueValidator = require("mongoose-unique-validator");


const TherapistSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
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
                validator.isEmail,
                "Email format is not valid",
            ],
        },
        password:{
            type:String,
            required:true,
            trim:true,
            required: true,
            validate: {
                validator: validatePassword,
                message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
            }
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
        passwordResetToken: String,
        passwordResetExpires: Date,
        verificationCode: Number,
        verificationCodeExpires: Date
    },
    {
        collection: "therapists",
        timestamps: true,
      }
);
TherapistSchema.plugin(uniqueValidator, {
    message: "This {PATH} is exist",
});


TherapistSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

// Method to mark the user's email as verified
TherapistSchema.methods.markAsVerified = async function () {
    this.isEmailVerified = true
    await this.save({validateBeforeSave: false})
}

// Method to check if the provided password matches the hashed password in the database
TherapistSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

TherapistSchema.methods.createPasswordResetToken = function () {
    // Generates a random 32-byte reset token and converts it to a hexadecimal string
    const resetToken = crypto.randomBytes(32).toString("hex")

    // Hashes the reset token and stores it in the database for security
    this.passwordResetToken = resetTokenHash(resetToken)

    // Sets an expiration time for the reset token (10 minutes from now)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    // Returns the raw reset token (not hashed) to be sent to the user
    return resetToken    
}

TherapistSchema.methods.createVerificationCode = function() {
    const verificationCode = Math.floor(100000 + Math.random() * 900000)

    this.verificationCode = verificationCode

    this.verificationCodeExpires = Date.now() + 10 * 60 * 1000

    return verificationCode
}

module.exports = mongoose.model("Therapist ", TherapistSchema);
