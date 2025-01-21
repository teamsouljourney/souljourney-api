"use strict";
/* -------------------------------------------------------
SOULJOURNEY API  
------------------------------------------------------- */
const User = require("../models/user");
const Token = require("../models/token")
const jwt = require("jsonwebtoken");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const { createSendToken } = require("../helpers/jwtFunctions");

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
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
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
        const user = await User.create(req.body)
        // console.log(user);
        
        //? Simple Token
        const tokenData = await Token.create({
            userId: user._id,
            // token: crypto.randomBytes(32).toString('hex')
            token: passwordEncrypt(user._id + Date.now())
        })
        // console.log(tokenData);

        //? JWT    
        createSendToken(user, 202, tokenData, res)
        
    },
    read: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Read User"
        */
        const data = await User.findOne({_id: req.params.id})
        res.status(200).send({
            error: false,
            data
        })
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
                    "password": "aA!123456",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
        const data = await User.updateOne({_id: req.params.id}, req.body, {runValidators: true})        
        res.status(201).send({
            error: false,
            message: "User updated successfully!",
            data,
            new: await User.findOne({_id: req.params.id})
        })
    },
    delete: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
        const data = await User.deleteOne({_id: req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            message: data.deletedCount ? "User deleted successfully!" : "User not found!",
            data
        })
    },
}