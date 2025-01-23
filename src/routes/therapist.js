"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router()

const user = require("../controllers/therapist")

router.route("/")
    .get(user.list)
    .post(user.create)
router.route("/:id")
    .get(user.read)
    .put(user.update)
    .patch(user.update)
    .delete(user.delete)

module.exports = router