import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  commentDescription: {
    type: String,
    required: true,
  },
});

const comment = mongoose.model("comment", commentSchema);
export default comment;
