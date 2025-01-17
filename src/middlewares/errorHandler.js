"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {
  
  return res.status(err?.statusCode || res?.errorStatusCode || 400).send({
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
    // stack: err.stack
  });
};
