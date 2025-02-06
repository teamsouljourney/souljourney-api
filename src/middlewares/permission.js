"use strict";

/* ------------------------------------------------- */
/*                 SOULJOURNEY API                   */
/* ------------------------------------------------- */

const CustomError = require("../errors/customError");

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new CustomError(
        "NoPermission: You must login and to be Admin.",
        400
      );
    }
  },
};
