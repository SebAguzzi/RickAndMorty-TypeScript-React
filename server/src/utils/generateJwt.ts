import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateJwt = (userId: number) => {
  const secretKey = process.env.SECRETORPRIVATEKEY || "";

  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
};
