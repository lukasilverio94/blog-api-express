import User from "../users/user.model.js";
import AppError from "../utils/AppError.js";
import { randomUUID } from "node:crypto";
import { hashPassword, checkPassword } from "../utils/auth.services.js";
import { addRefreshTokenToWhiteList } from "./auth.services.js";
import { generateTokens } from "../utils/jwt.js";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new AppError("All fields are required", 403);
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      throw new AppError("Email already in use", 401);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const jti = randomUUID();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export { registerUser };
