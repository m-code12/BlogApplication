import express from "express";
/*named Import */
import {
  signupUser,
  loginUser,
  logOutUser,
} from "../controller/userController.js";
import { createCategory } from "../controller/categoryController.js";
import saveBlog from "../controller/saveBlogController.js"; /*default import */
import getAllBlogs from "../controller/getBlogsController.js";
import getBlog from "../controller/getBlogController.js";
import updateBlog from "../controller/updateBlogController.js";
import deleteBlog from "../controller/deleteBlogController.js";
import { saveComment } from "../controller/saveCommentController.js";
import { getAllComments } from "../controller/getAllCommentsController.js";
import { deleteComment } from "../controller/deleteCommentController.js";
import { authenticateToken } from "../controller/jwtController.js";
import refreshToken from "../controller/refreshTokenController.js";

/*creating the router 
router: router is an instance of an Express router, 
which is a way to group and organize routes and route handlers.*/
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/refresh", refreshToken);
router.post("/categories", authenticateToken, createCategory);
router.post("/save/blog", authenticateToken, saveBlog);
router.get("/getBlogs", authenticateToken, getAllBlogs);
router.get("/getBlogById/:id", authenticateToken, getBlog);
router.put("/update/:id", authenticateToken, updateBlog);
router.delete("/delete/:id", authenticateToken, deleteBlog);
router.post("/comment/save", authenticateToken, saveComment);
router.get("/getAllComments/:id", authenticateToken, getAllComments);
router.delete("/deleteComment/:id", authenticateToken, deleteComment);
export default router;
