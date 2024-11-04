import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  hashedToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d",
  },
});

export default mongoose.model("RefreshToken", refreshTokenSchema);
