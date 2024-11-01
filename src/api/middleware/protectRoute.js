import jwt from "jsonwebtoken";
import AppError from "../src/api/utils/AppError.js";

const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("Authentication required", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
};

export default protectRoute;
