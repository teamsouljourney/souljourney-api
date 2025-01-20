"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const {mongoose} = require("../configs/dbConnection")

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

const UserSchema = new mongoose.Schema({}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)
