"use strict";
/* -------------------------------------------------------
   EXPRESS - SOUL JOURNEY API
------------------------------------------------------- */
require('dotenv').config();
const HOST = process.env?.HOST || '127.0.0.1';
const PORT = process.env?.PORT || 8000;
/* ------------------------------------------------------- */
const swaggerAutogen = require('swagger-autogen')();
const packageJson = require('./package.json');


const documents = {
    info: {
        version: packageJson.version,
        title: packageJson.title,
        description: packageJson.description,
        contact: { name: packageJson.author },
        license: { name: packageJson.license },
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
        },
        Bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Authentication * Example: <b>Bearer ...jwtToken...</b>'
        },
    },
    security: [
        { Token: [] },
        { Bearer: [] }
    ],
   
    definitions: {

        Appointment: require('./src/models/appointment').schema.obj,

        Blog: require('./src/models/blog').schema.obj, 

        Category: require('./src/models/category').schema.obj,

        Feedback: require('./src/models/feedback').schema.obj,

        Message: require('./src/models/message').schema.obj,

        Notes: require('./src/models/notes').schema.obj,
        
        Therapist: require('./src/models/therapist').schema.obj,

        TherapistTimeTable: require('./src/models/therapistTimeTable').schema.obj,

        Token: require('./src/models/token').schema.obj,
        
        User: require('./src/models/user').schema.obj,
       
    }
};

const routes = ["./src/routes/index.js"];
   
const outputFile = './src/configs/swagger.json';

swaggerAutogen(outputFile, routes, documents);
