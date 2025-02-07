/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Token = require("../models/token");
const User = require("../models/user");
const Therapist = require("../models/therapist");

module.exports = async (req, res, next) => {
  req.user = null;

  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // SimpleToken

      const tokenData = await Token.findOne({ token: tokenKey[1] })
        .populate("userId")
        .populate("therapistId");

      if (!tokenData || (!tokenData.userId && !tokenData.therapistId)) {
        return res.status(401).json({
          status: "fail",
          message: "The user belonging to this token no longer exists.",
        });
      }

      if (tokenData.userId) {
        req.user = tokenData.userId;
      } else if (tokenData.therapistId) {
        req.user = tokenData.therapistId;
      }

      // console.log(req.user);
      req.body.userId = req.user._id;
    } else if (tokenKey[0] == "Bearer") {
      // JWT

      const decoded = await promisify(jwt.verify)(
        tokenKey[1],
        process.env.JWT_SECRET
      );

      let currentUser;

      currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        currentUser = await Therapist.findById(decoded.id);
      }

      if (!currentUser) {
        return res.status(401).json({
          status: "fail",
          message: "The user belonging to this token no longer exists.",
        });
      }

      req.user = currentUser;
      req.body.userId = currentUser._id;
    }
  }
  next();
};
