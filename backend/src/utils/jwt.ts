import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "fundbridge-development-secret";

export function generateToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}