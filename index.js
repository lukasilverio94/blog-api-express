import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

import {
  blogDetail,
  createBlogPost,
  getAllPosts,
} from "./controllers/blogController.js";

// Load env variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// all posts
app.get("/blogs", getAllPosts);

// create new post
app.post("/blogs", createBlogPost);

// detail post
app.get("/blogs/:id", blogDetail);

// connect db
connectDb();

// start server
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
