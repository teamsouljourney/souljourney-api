"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */


const Blog = require("../models/Blog") ;

module.exports={
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
 read:async (req, res) => {
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
    const blog = await Blog.findById(req.query.id).populate("userId categoryId");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
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
    const blog = await Blog.findById(req.query.id).populate("userId categoryId");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
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
  if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.status(200).json({ success: true });
} catch (error) {
  res.status(400).json({ success: false, message: error.message });
}
},


}

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
