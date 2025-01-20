"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const {mongoose} = require("../configs/dbConnection")
const validator = require("validator");
const validatePassword = require("../helpers/validatePassword");
const bcrypt = require("bcryptjs")

/* ------------------------------------------------------- *
{
    "userName": "admin",
    "password": "aA?123456",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin",
    "isActive": true,
    "isAdmin": true,
    "isStaff": true,
}
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: function () {
            return this.googleId ? false : true
        },
        trim: true,
        validate: {
            validator: validatePassword,
            message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        validate: [validator.isEmail, "Please provide a valid e-mail!"]
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: ""
    },
    phone: {
        type: String,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        trim: true,
        default: ""
    },
    profession: {
        type: String,
        trim: true,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    verificationCode: Number,
    verificationCodeExpires: Date
}, {
    collection: 'users',
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

UserSchema.methods.markAsVerified = async function () {
    this.isEmailVerified = true
    await this.save({validateBeforeSave: false})
}

module.exports = mongoose.model("User", UserSchema)
