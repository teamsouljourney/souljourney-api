"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Blog = require("../models/blog");
const CustomError = require("../errors/customError");
const translations = require("../../locales/translations");

module.exports = {
  list: async (req, res) => {
    /* 
        #swagger.tags = ["Blogs"]
        #swagger.summary = "List Blogs"
        #swagger.description = `
            You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                <li>URL/?<b>limit=10&page=1</b></li>
            </ul>
        `
    */

    let customFilter = {};

    if (req.query?.category) {
      customFilter = { categoryId: req.query.category };
    }

    const data = await res.getModelList(Blog, customFilter, [
      "therapistId",
      "categoryId",
    ]);

    res.status(200).send({
      error: false,
      message: req.t(translations.blog.listSuccess),
      details: await res.getModelListDetails(Blog),
      data,
    });
  },
  create: async (req, res) => {
    /* 
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref:"#/definitions/Blog"
            }
        }
    */
    // Set therapistId from logged in therapist
    req.body.therapistId = req.user._id;

    const data = await Blog.create(req.body);
    res.status(201).send({
      error: false,
      message: req.t(translations.blog.createSuccess),
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Single Blog"
    */
    const data = await Blog.findOne({ _id: req.params.id }).populate([
      "therapistId",
      "categoryId",
    ]);

    if (!data) {
      throw new CustomError(req.t(translations.blog.notFound), 404);
    }

    data.countOfVisitors += 1;
    await data.save();
    res.status(200).send({
      error: false,
      message: req.t(translations.blog.readSuccess),
      data,
    });
  },
  update: async (req, res) => {
    /* 
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Update an existing blog post"
        #swagger.description = "Updates the blog post. Only the therapist who created the post can update it."
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    title: { type: 'string', example: 'Updated Blog Title' },
                    content: { type: 'string', example: 'Updated blog content' },
                    image: { type: 'string', example: 'https://example.com/updated-image.jpg' },
                    categoryId: { type: 'string', example: '5f50c31b2b8f07c1f1e6e89c' }
                }
            }
        }
        
    */
    const blogData = await Blog.findOne({ _id: req.params.id });

    if (!blogData) {
      throw new CustomError(req.t(translations.blog.notFound), 404);
    }

    if (blogData.therapistId.toString() != req.user._id) {
      throw new CustomError(req.t(translations.blog.updateUnauthorized), 403);
    }

    const data = await Blog.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(200).send({
      error: false,
      message: req.t(translations.blog.updateSuccess),
      data,
      new: await Blog.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /* 
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Delete Blog"
    */
    const blogData = await Blog.findOne({ _id: req.params.id }).populate(
      "therapistId"
    );

    if (!blogData) {
      throw new CustomError(req.t(translations.blog.notFound), 404);
    }

    if (!req.user.isAdmin && blogData.therapistId.email !== req.user.email) {
      throw new CustomError(req.t(translations.blog.deleteUnauthorized), 403);
    }

    const data = await Blog.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? req.t(translations.blog.deleteSuccess)
        : req.t(translations.blog.deleteFailed),
      data,
    });
  },
  getLike: async (req, res) => {
    /* 
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Like Info"
    */
    const data = await Blog.findOne({ _id: req.params.id });

    if (!data) {
      throw new CustomError(req.t(translations.blog.notFound), 404);
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.blog.getLikeSuccess),
      likes: data.likes,
    });
  },

  postLike: async (req, res) => {
    /* 
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Add/Remove Like"
    */
    const data = await Blog.findOne({ _id: req.params.id });

    if (!data) {
      throw new CustomError(req.t(translations.blog.notFound), 404);
    }

    let likes = data?.likes.map((id) => id.toString()) || [];
    const userId = req.user._id.toString();

    if (likes.includes(userId)) {
      likes = likes.filter((id) => id !== userId);
    } else {
      likes.push(userId);
    }

    data.likes = likes;
    await data.save();

    res.status(200).send({
      error: false,
      message: req.t(translations.blog.postLikeSuccess),
      data,
    });
  },
};
