"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

// UPLOAD (Multer Middleware)
// npm i multer

const multer = require("multer");

module.exports = multer({
  //  dest: "./uploads/"
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, returnCallback) => {
      //   console.log("file", file);
      // returnCallback(error ,filename) syntax
      returnCallback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// .post(upload.single(), create);
// .post(upload.array("image"), create)
// .post(upload.any(), create)
