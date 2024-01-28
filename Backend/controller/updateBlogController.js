import blog from "../model/blog.js";

const updateBlog = async (req, res) => {
  try {
    const blogData = await blog.findById(req.params.id);
    if (!blogData) {
      return res.status(400).json({
        msg: "blog not found",
      });
    }
    if (req.user.userName != blogData.userName)
      return res.status(400).json({
        msg: "You are not Authenticated",
      });
    await blog.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          categories: req.body.categories,
        },
      }
    );
    return res.status(200).json({
      msg: "Blog Updated Sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Blog Updation Failed",
    });
  }
};

export default updateBlog;
