import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/environment.js";

export function generateToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    jwtSecret,
    {
      expiresIn: "7d",
    }
  );
}
