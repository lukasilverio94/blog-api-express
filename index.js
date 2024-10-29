import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./src/api/posts/post.routes.js";
import authRoutes from "./src/api/auth/auth.routes.js";

import { registerUser } from "./src/api/auth/auth.controller.js";

// connect db
connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/blogs", postRoutes);
app.use("/users", authRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
