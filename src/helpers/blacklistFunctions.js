"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklistModel");

const blacklistToken = async (token) => {
  const decoded = jwt.decode(token);
  const expTimestamp = decoded.exp * 1000;

  await Blacklist.create({
    token: token,
    expiresAt: new Date(expTimestamp),
  });
};

module.exports = blacklistToken;
