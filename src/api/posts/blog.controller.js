import Blog from "../posts/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    res.send(blogs);
  } catch (err) {
    console.log(err);
  }
};

export const createBlogPost = async (req, res) => {
  console.log("REQ ON CREATE BLOG", req);
  try {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("error creating blog", error);
    res.status(400).json({ message: error.message });
  }
};

export const blogDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("user");
    res.status(200).send(blog);
  } catch (err) {
    console.log("Blog not found!");
    res.status(404).send({ message: "Post not found" });
  }
};

export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Post not found");
    res.status(404).send({ message: "Post not found" });
  }
};

export const editBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const newBlog = await Blog.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json(newBlog);
  } catch (error) {
    console.log("Post not found", error);
  }
};
