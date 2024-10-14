import Blog from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (err) {
    console.log(err);
  }
};

export const createBlogPost = async (req, res) => {
  try {
    const newBlog = await Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    console.log("error creating blog", error);
    res.status(500).send({ message: "Failed to create blog" });
  }
};

export const blogDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.status(200).send(blog);
  } catch (err) {
    console.log("Blog not found!");
    res.status(404).send({ message: "Post not found" });
  }
};
