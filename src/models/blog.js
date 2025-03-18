"use strict";

/* ------------------------------------------------- */
/*                  SOULJOURNEY API                  */
/* ------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");

const BlogSchema = new mongoose.Schema({
  therapistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true
  },

  categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
  },

  title: {
      type: String,
      required: true,
      trim: true
  },

  content: {
      type: String,
      required: [true, 'Content is required!'],
      trim: true
  },

  image: {
      type: String,
      required: true,
      trim: true
  },

  likes: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
  ],

  countOfVisitors: {
      type: Number,
      default: 0
  },
}, {
  collection: "blogs",
  timestamps: true
})

module.exports = mongoose.model("Blog", BlogSchema);
