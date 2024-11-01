import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./src/api/posts/post.routes.js";
import authRoutes from "./src/api/auth/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// connect db
connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

// CORS option config
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/blogs", postRoutes);
app.use("/users", authRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
