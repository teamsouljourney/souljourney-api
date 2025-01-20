"use strict";
/* -------------------------------------------------------
SOULJOURNEY API  
------------------------------------------------------- */
const User = require("../models/user");
const Token = require("../models/token")
const jwt = require("jsonwebtoken")

module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },
    create: async (req, res) => {
        const userData = await User.create(req.body)
        // console.log(userData);
        
        //? Simple Token
        const tokenData = await Token.create({
            userId: userData._id,
            token: crypto.randomBytes(32).toString('hex')
        })
        // console.log(tokenData);

        //? JWT

        // Access Token
        const accessData = {
            _id: userData._id,
            userName: userData.userName,
            email: userData.email,
            isActive: userData.isActive,
            isAdmin: userData.isAdmin
        }

        //Convert to JWT
        const accessToken = jwt.sign(accessData, process.env._ACCESS_KEY, {expiresIn: "2h"})

        res.status(202).send({
            error: false,
            message: "User created successfully!",
            token: tokenData.token,
            bearer: {access: accessToken},
            userData
        })
    },
    read: async (req, res) => {
        const data = await User.findOne({_id: req.params.id})
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        const data = await User.updateOne({_id: req.params.id}, req.body, {runValidators: true})        
        res.status(201).send({
            error: false,
            message: "User updated successfully!",
            data,
            new: await User.findOne({_id: req.params.id})
        })
    },
    delete: async (req, res) => {
        const data = await User.deleteOne({_id: req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            message: data.deletedCount ? "User deleted successfully!" : "User not found!",
            data
        })
    },
}