"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

// Category Controllers:

const Category = require("../models/category");
const CustomError = require("../errors/customError");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ["Category"]
            #swagger.summary = "List Categories"
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

    const data = await res.getModelList(Category);

    res.status(200).send({
      error: false,
      message: req.t(translations.category.listSuccess),
      details: await res.getModelListDetails(Category),
      data,
    });
  },
  create: async (req, res) => {
    /* 
            #swagger.tags = ["Category"]
            #swagger.summary = "Create Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Category"
                }
            }
        */

    const data = await Category.create(req.body);

    res.status(201).send({
      error: false,
      message: req.t(translations.category.createSuccess),
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    /* 
            #swagger.tags = ["Category"]
            #swagger.summary = "Read Category"
        */

    const data = await Category.findOne({ _id: req.params.id });

    if (!data) {
      throw new CustomError(req.t(translations.category.notFound), 404);
    }

    res.status(200).send({
      error: false,
      message: req.t(translations.category.readSuccess),
      data,
    });
  },

  update: async (req, res) => {
    /* 
            #swagger.tags = ["Category"]
            #swagger.summary = "Update Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref:"#/definitions/Category"
                }
            }
        */

    const data = await Category.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(200).send({
      error: false,
      message: req.t(translations.category.updateSuccess),
      data,
      new: await Category.findOne({ _id: req.params.id }),
    });
  },

  deleteCategory: async (req, res) => {
    /* 
            #swagger.tags = ["Category"]
            #swagger.summary = "Delete Category"
        */

    const data = await Category.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: req.t(translations.category.deleteSuccess),
      data,
    });
  },
};
