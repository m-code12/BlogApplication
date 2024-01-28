import blog from "../model/blog.js";

const saveBlog = async (req, res) => {
  try {
    const newBlog = new blog(req.body);
    await newBlog.save();
    return res.status(200).json({
      msg: "Blog created Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export default saveBlog; /*default export */
