"use strict";
/* -------------------------------------------------------
SOULJOURNEY API  
------------------------------------------------------- */
const User = require("../models/user");

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
        res.status(200).send({
            error: false,
            data
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
            data,
            new: await User.findOne({_id: req.params.id})
        })
    },
    delete: async (req, res) => {
        res.status(200).send({
            error: false,
            data
        })
    },
}