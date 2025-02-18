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

    const data = await res.getModelList(Therapist, {}, ["categoryId", "feedbackId"]);
    // const data = await res.getModelList(Therapist, customFilter);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Therapist,customFilter),
      // details: await res.getModelListDetails(Therapist, customFilter),

      data,
    });
  },

  create: async (req, res) => {
    /*
        #swagger.tags = ["Therapists"]
        #swagger.summary = "Create Therapist"
        #swagger.description = "Create a new therapist entry with their details."
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    firstName: { type: 'string', example: 'Mehmet' },
                    lastName: { type: 'string', example: 'Yılmaz' },         
                    email: { type: 'string', example: 'mehmet.yilmaz@example.com' },
                    password: { type: 'string', example: 'Password123!' },
                    image: { type: 'string', example: 'https://example.com/mehmet.jpg' },
                    categoryId: { type: 'string', example: '67a475aeb6da7c1f21194622' '67a47634b6da7c1f21194632' },
                    description: { type: 'string', example: 'Experienced psychologist specializing in mental health.' },
                    experince: { type: 'string', example: '7 yrs in practice Stress, Anxiety, Addictions, Family conflicts,Self esteem, Motivation, Additional areas of focus: Grief, Intimacy-related issues, Eating disorders, Sleeping disorders, Parenting issues, Anger management, ADHD, Clinical approaches: Client-Centered Therapy' },
                    graduation: { type: 'string', example: 'Marmara University' },
                    isActive: { type: 'boolean', example: true },
                }
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
    const data = await Therapist.findOne({ _id: req.params.id }).populate(["categoryId", "feedbackId"]);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
  /*
    #swagger.tags = ["Therapists"]
    #swagger.summary = "Update Therapist"
    #swagger.description = "This endpoint allows you to update the therapist's information, including their personal details, description, image, and category."
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'The ID of the therapist to be updated',
        required: true,
        type: 'string',
    }
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            type: 'object',
            properties: {
                firstName: { type: 'string', example: 'Mehmet' },
                lastName: { type: 'string', example: 'Yılmaz' },
                email: { type: 'string', example: 'mehmet.yilmaz@example.com' },
                password: { type: 'string', example: 'Password123!' },
                image: { type: 'string', example: 'https://example.com/mehmet.jpg' },
                categoryId: { type: 'string', example: '67a475aeb6da7c1f21194622' },
                description: { type: 'string', example: 'Experienced psychologist specializing in mental health.' },
                isActive: { type: 'boolean', example: true },
            },
        },
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
