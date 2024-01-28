import blog from "../model/blog.js";
const deleteBlog = async (req, res) => {
  try {
    const response = await blog.findOne({ _id: req.params.id });
    /*If the author of the blog is not the one who logged in */
    if (req.user.userName != response.userName)
      return res.status(400).json({
        msg: "You are not Authenticated",
      });
    await blog.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      msg: "Blog deleted sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Blog Deletion Failed",
    });
  }
};
export default deleteBlog;
