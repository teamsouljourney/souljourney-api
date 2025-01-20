"use strict";
/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const crypto = require("node:crypto")
/**
 * Hashes a given input string using SHA-256
 * @param {string} input - The input string to hash
 * @returns {string} - The hashed value
*/

module.exports = (input) => {
    return crypto.createHash("sha256").update(input).digest("hex")
}