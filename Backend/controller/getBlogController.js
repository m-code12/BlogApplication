import blog from "../model/blog.js";

const getBlog = async (req, res) => {
  try {
    const response = await blog.findOne({ _id: req.params.id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      msg: "Blog Fetching Failed",
    });
  }
};
export default getBlog;
