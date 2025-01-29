"use strict";
/* -------------------------------------------------------
                    SOULJOURNEY API  
------------------------------------------------------- */

const router = require("express").Router()

const blog = require("../controllers/blog")

router.route("/")
    .get(blog.list)
    .post(blog.create)
router.route("/:id")
    .get(blog.read)
    .put(blog.update)
    .patch(blog.update)
    .delete(blog.delete)

module.exports = router

// "use strict";

// const router = require('express').Router()

// const{
//   getBlogs,
//   getBlogById,
//   createBlog,
//   updateBlog,
//   deleteBlog
// } = require ("../controllers/blogController") ; 



// // Tüm blogları listele (GET)
// router.get("/", getBlogs);

// // ID'ye göre bir blogu getir (GET)
// router.get("/:id", getBlogById);

// // Yeni blog oluştur (POST)
// router.post("/", createBlog);

// // Blogu güncelle (PUT)
// router.put("/:id", updateBlog);

// // Blogu sil (DELETE)
// router.delete("/:id", deleteBlog);

// module.exports = router;
