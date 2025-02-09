"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router()

const blog = require("../controllers/blog")

router.route("/")
    .get(blog.list)
    .post(isTherapist, blog.create)
router.route("/:id")
    .get(blog.read)
    .put(isTherapist, blog.update)
    .patch(isTherapist, blog.update)
    .delete(isTherapist, blog.delete)

    router.get("/liked", blog.listLiked)


module.exports = router



