"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const express = require("express");
const fs = require("fs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const app = express();
const cors = require("cors");
const http = require("http");
const https = require("https");
const initializeSocket = require("./src/configs/socket");

const key = fs.readFileSync("./certs/localhost-key.pem");
const cert = fs.readFileSync("./certs/localhost.pem");

let server;
if (process.env.NODE_ENV === "production") {
  server = http.createServer(app);
} else {
  server = https.createServer({ key, cert }, app);
}

/* ----------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ----------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

// Connect to socket.io
const io = initializeSocket(server);

//  i18next
app.use(require("./i18n"));

/* ------------------------------------------------------- */
// Middlewares:

// Cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Passportjs Authentication Config
require("./src/configs/passportjs-auth/passportConfig");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

/* ------------------------------------------------- */

// Accept JSON:
app.use(express.json());

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// res.getModelList():
app.use(require("./src/middlewares/queryHandler"));

// Run Logger:
// app.use(require('./src/middlewares/logger'))

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Soul Journey API",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
  });
});

// Routes:
app.use(require("./src/routes/index"));

app.use("/checkout", require("./src/routes/payment"));

// Not Found
app.use("*", (req, res) => {
  res.status(404).json({
    error: true,
    message: "404 Not Found",
  });
});

/* ------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

// RUN SERVER:
server.listen(PORT, () => {
  console.log(
    `Server running on ${
      process.env?.NODE_ENV === "development" ? "https" : "http"
    }://${HOST}:${PORT}`
  );
});

/* ------------------------------------------------------- */
