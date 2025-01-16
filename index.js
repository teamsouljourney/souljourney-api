"use strict"

const express = require("express")
const app = express()

/* ----------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ----------------------------------- */
// Configrations:



/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())




/* ------------------------------------------------------- */





/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Soul Journey API'
    })
})



// Not Found
app.use('*', (req, res) => {
    res.status(404).json({
        error: true,
        message: '404 Not Found'
    })
})



/* ------------------------------------------------------- */
// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))
/* ------------------------------------------------------- */