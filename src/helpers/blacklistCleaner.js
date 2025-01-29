"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const cron = require("node-cron");
const Blacklist = require("../models/blacklistModel");

// Function to clean expired tokens
const cleanExpiredTokens = async () => {
  const now = new Date();
  const result = await Blacklist.deleteMany({ expiresAt: { $lte: now } });
  if (result.deletedCount > 0) {
    console.log(
      `Expired tokens cleaned from blacklist. Count: ${result.deletedCount}`
    );
  }
};

// Schedule the cleaning task
const scheduleBlacklistCleanup = () => {
  cron.schedule("*/10 * * * *", cleanExpiredTokens);
};

module.exports = scheduleBlacklistCleanup;
