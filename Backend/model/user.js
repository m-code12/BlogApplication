import mongoose from "mongoose";
/*Creating a collection schema */
const userSchema = mongoose.Schema(
  {
    /*Username is must required and it should be unqiue*/
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    /*password is also must required*/
    password: {
      type: String,
      required: true,
    },
  },
  /*adding the created date and time timestamps */
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
export default user; /*default export */
