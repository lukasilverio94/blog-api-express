import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";

import { registerUser } from "./controllers/userController.js";

// Load env variables
dotenv.config();

// connect db
connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/blogs", postRoutes);
// USERS
app.post("/user/register", registerUser);

// start server
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});
