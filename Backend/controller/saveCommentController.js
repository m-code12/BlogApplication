import Comment from "../model/comment.js";
export const saveComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    if (req.user.userName != req.body.userName)
      return res.status(400).json({
        msg: "You are not Authenticated",
      });
    await newComment.save();
    return res.status(200).json({
      msg: "Comment Saved Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Comment Addtion Failed",
    });
  }
};
