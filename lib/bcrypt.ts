import bcrypt from "bcryptjs";

export const Hash = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const Match = async (password: string, hashedPass: string) => {
  const isMatch = await bcrypt.compare(password, hashedPass);
  return isMatch;
};
