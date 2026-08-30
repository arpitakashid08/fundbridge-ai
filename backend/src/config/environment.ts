import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const jwtSecret = process.env.JWT_SECRET || (!isProduction ? "fundbridge-development-secret" : "");

export const frontendOrigins = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const localFrontendOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5176",
];

export const allowedOrigins = frontendOrigins.length ? frontendOrigins : localFrontendOrigins;

export const uploadDirectory = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.resolve(process.cwd(), "uploads");

export const uploadPublicPath = (process.env.UPLOAD_PUBLIC_PATH || "/uploads").replace(/\/$/, "");

export function validateProductionEnvironment() {
  const missing = [
    !process.env.DATABASE_URL && "DATABASE_URL",
    !jwtSecret && "JWT_SECRET",
    !frontendOrigins.length && "FRONTEND_ORIGIN",
    !process.env.UPLOAD_DIR && "UPLOAD_DIR",
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }
}
