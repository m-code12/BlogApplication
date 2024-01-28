import comment from "../model/comment.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await comment.find({ postId: req.params.id }).lean(); // Use the lean() method
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
