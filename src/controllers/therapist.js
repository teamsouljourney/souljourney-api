"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const Therapist = require("../models/therapist");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Therapists"]
            #swagger.summary = "List Therapists"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */


    // let customFilter = {}
    // if (!req.user.isAdmin) customFilter = { isAdmin: false }

    const data = await res.getModelList(Therapist, "categoryId");
    // const data = await res.getModelList(Therapist, customFilter);


    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Therapist),
      // details: await res.getModelListDetails(Therapist, customFilter),

      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Therapists"]
            #swagger.summary = "Create Therapists"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Therapist"
                }
            }
        */

    // req.body.isAdmin = false;

    const data = await Therapist.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Therapists"]
            #swagger.summary = "Get Single Therapist"
        */
    const data = await Therapist.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Therapists"]
            #swagger.summary = "Update Therapist"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Therapist"
                }
            }
        */

    const data = await Therapist.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Therapist.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Therapists"]
            #swagger.summary = "Delete Therapist"
        */

    const data = await Therapist.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
