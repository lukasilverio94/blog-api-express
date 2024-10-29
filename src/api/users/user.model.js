import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide an username."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please provide a password."],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
