"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Blog = require("../models/blog");

module.exports = {
  list: async (req, res) => {
    /*
             #swagger.tags = ['Blog']
             #swagger.summary = 'Get all blogs'
             #swagger.description = 'Fetch a list of all blogs with optional population of userId and categoryId.'
         */
    try {
      const blogs = await Blog.find().populate("userId categoryId");
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ['Blog']
            #swagger.summary = 'Get blog by ID'
            #swagger.description = 'Fetch a blog by its unique ID and populate the userId and categoryId fields.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                schema: {
                    $ref:"#/definitions/Blog"
                }
            }
        */
    try {
      const blog = await Blog.findById(req.query.id).populate(
        "userId categoryId"
      );
      if (!blog)
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ['Blog']
            #swagger.summary = 'Get blog by ID'
            #swagger.description = 'Fetch a blog by its unique ID and populate the userId and categoryId fields.'
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'ID of the blog to retrieve.',
                type: 'string',
            }
        */
    try {
      const blog = await Blog.findById(req.query.id).populate(
        "userId categoryId"
      );
      if (!blog)
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  update: async (req, res) => {
    /*
          #swagger.tags = ['Blog']
          #swagger.summary = 'Create a new blog'
          #swagger.description = 'Create and save a new blog post in the database.'
          #swagger.parameters['body'] = {
              in: 'body',
              required: true,
              description: 'Blog data to create.',
              schema: {
                title: 'string',
                content: 'string',
                image: 'string',
                userId: 'string',
                categoryId: 'string',
                likes: 'integer',
              },
          }
      */
    try {
      const blog = await Blog.create(req.body);
      res.status(201).json({ success: true, data: blog });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  delete: async (req, res) => {
    /*
          #swagger.tags = ['Blog']
          #swagger.summary = 'Delete blog by ID'
          #swagger.description = 'Delete a blog post from the database by its unique ID.'
          #swagger.parameters['id'] = {
              in: 'path',
              required: true,
              description: 'ID of the blog to delete.',
              type: 'string',
          }
      */
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.query.id);
      if (!deletedBlog)
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

// export const getBlogs = async (req, res) => {
//    /*
//             #swagger.tags = ['Blog']
//             #swagger.summary = 'Get all blogs'
//             #swagger.description = 'Fetch a list of all blogs with optional population of userId and categoryId.'
//         */
//   try {
//     const blogs = await Blog.find().populate("userId categoryId");
//     res.status(200).json({ success: true, data: blogs });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getBlogById = async (req, res) => {
//   /*
//             #swagger.tags = ['Blog']
//             #swagger.summary = 'Get blog by ID'
//             #swagger.description = 'Fetch a blog by its unique ID and populate the userId and categoryId fields.'
//             #swagger.parameters['id'] = {
//                 in: 'path',
//                 required: true,
//                 description: 'ID of the blog to retrieve.',
//                 type: 'string',
//             }
//         */
//   try {
//     const blog = await Blog.findById(req.query.id).populate("userId categoryId");
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, data: blog });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createBlog = async (req, res) => {
//     /*
//             #swagger.tags = ['Blog']
//             #swagger.summary = 'Create a new blog'
//             #swagger.description = 'Create and save a new blog post in the database.'
//             #swagger.parameters['body'] = {
//                 in: 'body',
//                 required: true,
//                 description: 'Blog data to create.',
//                 schema: {
//                   title: 'string',
//                   content: 'string',
//                   image: 'string',
//                   userId: 'string',
//                   categoryId: 'string',
//                   likes: 'integer',
//                 },
//             }
//         */
//   try {
//     const blog = await Blog.create(req.body);
//     res.status(201).json({ success: true, data: blog });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const updateBlog = async (req, res) => {
//   /*
//             #swagger.tags = ['Blog']
//             #swagger.summary = 'Update blog by ID'
//             #swagger.description = 'Update a blog post\'s details by its unique ID.'
//             #swagger.parameters['id'] = {
//                 in: 'path',
//                 required: true,
//                 description: 'ID of the blog to update.',
//                 type: 'string',
//             }
//             #swagger.parameters['body'] = {
//                 in: 'body',
//                 required: true,
//                 description: 'Updated blog data.',
//                 schema: {
//                   title: 'string',
//                   content: 'string',
//                   image: 'string',
//                   userId: 'string',
//                   categoryId: 'string',
//                   likes: 'integer',
//                 },
//             }
//         */
//   try {
//     const blog = await Blog.findByIdAndUpdate(req.query.id, req.body, { new: true });
//     if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true, data: blog });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export const deleteBlog = async (req, res) => {
//     /*
//             #swagger.tags = ['Blog']
//             #swagger.summary = 'Delete blog by ID'
//             #swagger.description = 'Delete a blog post from the database by its unique ID.'
//             #swagger.parameters['id'] = {
//                 in: 'path',
//                 required: true,
//                 description: 'ID of the blog to delete.',
//                 type: 'string',
//             }
//         */
//   try {
//     const deletedBlog = await Blog.findByIdAndDelete(req.query.id);
//     if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

        // Set therapistId from logged in therapist
        // console.log(req.user);

        
        
        req.body.therapistId = req.user._id
        const data = await Blog.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
    // create: async (req, res) => {
    //     /* 
    //       #swagger.tags = ["Blogs"]
    //       #swagger.summary = "Create Blog"
    //       #swagger.parameters['body'] = {
    //           in: 'body',
    //           required: true,
    //           schema: {
    //               $ref:"#/definitions/Blog"
    //           }
    //       }
    //     */
    
    //     // Therapist ve Category ID'lerini kontrol etme
    //     const { therapistId, categoryId, title, content, image } = req.body;
    
    //     // Eğer therapistId veya categoryId eksikse hata döndür
    //     if (!therapistId || !categoryId) {
    //       return res.status(400).json({
    //         error: true,
    //         message: "Therapist ID and Category ID are required",
    //       });
    //     }
    
    //     // Therapist ve Category'nin varlığını kontrol et
    //     const therapist = await Therapist.findById(therapistId);
    //     const category = await Category.findById(categoryId);
    
    //     if (!therapist) {
    //       return res.status(400).json({
    //         error: true,
    //         message: "Therapist not found",
    //       });
    //     }
    
    //     if (!category) {
    //       return res.status(400).json({
    //         error: true,
    //         message: "Category not found",
    //       });
    //     }
    
    //     // Logged-in user's therapistId'yi kullanarak blogu oluştur
    //     req.body.therapistId = req.user._id;  // req.user, JWT token veya session'dan geliyor.
    
    //     const data = await Blog.create(req.body);
    //     res.status(201).send({
    //       error: false,
    //       message: "Blog created successfully",
    //       data,
    //     });
    //   },
    read: async(req, res) => {
        /*
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Single Blog"
        */
        const data = await Blog.findOne({_id: req.params.id}).populate(["therapistId", "categoryId"])
        data.countOfVisitors += 1
        data.save()
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async(req, res) => {
        /* 
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Blog"
                }
            }
        */
        const blogData = await Blog.findOne({_id: req.params.id}) 
        // console.log(blogData);
        // console.log(req.user);
       
       
        if (blogData.therapistId.toString() != req.user._id) {
            res.errorStatusCode = 401;
            throw new Error("You cannot update someone else's blog post")
        }
        const data = await Blog.updateOne({_id: req.params.id}, req.body, {runValidators: true})
        res.status(202).send({
            error: false,
            data,
            new: await Blog.findOne({_id: req.params.id}) //.populate(["therapistId", "categoryId"])
        })
    },
    delete: async(req, res) => {
        /* 
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Delete Blog"
        */
        const blogData = await Blog.findOne({_id: req.params.id}).populate("therapistId")
        // console.log(blogData.therapistId._id);
        // console.log(req.user);
        
       
        if (blogData.therapistId.email !== req.user.email) {
            res.errorStatusCode = 401;
            throw new Error("You cannot delete someone else's blog post")
        }

        const data = await Blog.deleteOne({_id: req.params.id})
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            message: "Blog deleted successfully!",
            data
        })
    },
    getLike: async(req, res) => {
        /* 
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Get Like Info"
        */
        const data = await Blog.findOne({_id: req.params.id})
        // console.log(data.likes);
        
        res.status(200).send({
            error: false,
            likes: data.likes
        })
    },
    //??
    postLike: async(req, res) => {
        /* 
            #swagger.tags = ["Blogs"]
            #swagger.summary = "Add/Remove Like"
        */
        const data = await Blog.findOne({_id: req.params.id})
        // console.log(data);
        
        let likes = data?.likes.map((id)=>id.toString()) || []
        const userId = req.user._id.toString()
        
        // console.log(likes);
        if (likes.includes(userId)) {
            // console.log("hello");            
            likes = likes.filter((id) => id !== userId)            
            console.log(likes);
        } else {
            likes.push(userId)
        }
        
        data.likes = likes
        await data.save()
        res.status(200).send({
            error: false,
            data,
        })
    },
   
}