import express from "express";
const router = express.Router();
import {
  blogDetail,
  createBlogPost,
  deleteBlogPost,
  editBlogPost,
  getAllPosts,
} from "./blogPost.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.get("/", getAllPosts);
router.post("/", authMiddleware, createBlogPost);
router.get("/:id", blogDetail);
router.put("/:id", editBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
