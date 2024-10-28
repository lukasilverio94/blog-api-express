import User from "../models/User.js";
import { hashPassword, checkPassword } from "../utils/auth.services.js";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("USER", user);
    res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export { registerUser };
