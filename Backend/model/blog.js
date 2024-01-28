import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    /*Title of the blog */
    title: {
      type: String,
      unique: true,
    },
    //description of the blog
    description: {
      type: String,
      required: true,
    },
    //Author name
    userName: {
      type: String,
      required: true,
    },
    //image
    image: {
      type: String,
      required: false,
    },
    //for the categories
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const blog = mongoose.model("blog", blogSchema);
export default blog;
