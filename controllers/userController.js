import User from "../models/User.js";

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    const user = await User.create(req.body);
    user.save();

    res.status(200).send(user);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export { registerUser };
