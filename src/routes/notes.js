"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router()

const notes = require("../controllers/notes")

router.route("/")
    .get(notes.list)
    .post(notes.create)
router.route("/:id")
    .get(notes.read)
    .put(notes.update)
    .patch(notes.update)
    .delete(notes.delete)

module.exports = router