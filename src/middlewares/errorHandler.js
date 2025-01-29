"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {
  console.log(err);
  
  return res.status(res?.errorStatusCode || 400).send({
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
    // stack: err.stack
  });
};
