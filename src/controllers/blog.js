"use strict"

const Blog = require("../models/blog")

module.exports = {
    list: async(req, res) => {
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
        const data = await res.getModelList(Blog, {}, ["therapistId", "categoryId"])
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Blog),
            data
        })
    },
    create: async(req, res) => {
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
        // console.log(req.user);
        
        req.body.therapistId = req.user._id
        const data = await Blog.create(req.body)
        res.status(201).send({
            error: false,
            data
        })
    },
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