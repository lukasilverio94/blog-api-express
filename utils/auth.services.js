import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
  return hashedPassword;
};

export const checkPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);
  console.log(match ? "Password match" : "Password donot match");
  return match;
};
