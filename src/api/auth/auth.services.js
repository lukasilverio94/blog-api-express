import RefreshToken from "../users/refresh.token.model.js";
import hashToken from "../utils/hashToken.js";

export const addRefreshTokenToWhiteList = async ({
  jti,
  refreshToken,
  userId,
}) => {
  const hashedToken = await hashToken(refreshToken);
  const newRefreshToken = new RefreshToken({
    id: jti,
    hashedToken,
    userId,
  });

  return await newRefreshToken.save();
};

export const findRefreshTokenById = async (id) => {
  return await RefreshToken.findOne({ id });
};

export const deleteRefreshToken = async (id) => {
  return await RefreshToken.findOneAndUpdate(
    { id },
    { revoked: true },
    { new: true }
  );
};

export const revokeTokens = async (userId) => {
  return await RefreshToken.updateMany({ userId }, { revoked: true });
};
