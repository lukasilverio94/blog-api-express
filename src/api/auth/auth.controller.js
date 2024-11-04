import User from "../users/user.model.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { hashPassword } from "../utils/auth.services.js";
import { addRefreshTokenToWhiteList } from "./auth.services.js";
import { generateTokens } from "../utils/jwt.js";
import { setAuthCookies, clearAuthCookies } from "../utils/setAuthCookies.js";

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

    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required.", 400);
    }

    const existingUser = await User.findOne({ email: email }).select(
      "+password"
    );
    if (!existingUser) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValidPassword = await bcrypt.compare(
      String(password),
      String(existingUser.password)
    );

    if (!isValidPassword) {
      throw new AppError("Invalid login credentials", 403);
    }

    const jti = randomUUID();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);

    await addRefreshTokenToWhiteList({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    clearAuthCookies(res);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, logoutUser };
