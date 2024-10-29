import express from "express";
const router = express.Router();
import {
  blogDetail,
  createBlogPost,
  deleteBlogPost,
  editBlogPost,
  getAllPosts,
} from "./blog.controller.js";

router.get("/", getAllPosts);
router.post("/", createBlogPost);
router.get("/:id", blogDetail);
router.put("/:id", editBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
