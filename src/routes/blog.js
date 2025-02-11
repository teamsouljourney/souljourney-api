"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router()

const blog = require("../controllers/blog")

router.route("/")
    .get(blog.list)
    .post( blog.create)
router.route("/:id")
    .get(blog.read)
    .put( blog.update)
    .patch( blog.update)
    .delete( blog.delete)



module.exports = router



