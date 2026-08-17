import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import fundingRoutes from "./routes/funding.routes.js";
import matchingRoutes from "./routes/matching.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import documentsRoutes from "./routes/documents.routes.js";
import grantsRoutes from "./routes/grants.routes.js";
import loansRoutes from "./routes/loans.routes.js";
import investorsRoutes from "./routes/investors.routes.js";
import { allowedOrigins, uploadDirectory, uploadPublicPath, validateProductionEnvironment } from "./config/environment.js";

validateProductionEnvironment();

const app = express();

const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS."));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(uploadPublicPath, express.static(uploadDirectory));
app.use("/api/grants", grantsRoutes);

app.use("/api/loans", loansRoutes);

app.use("/api/investors", investorsRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "FundBridge API is running.",
  });
});

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.get("/", (_req, res) => res.status(200).json({ status: "ok", service: "FundBridge API" }));

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/funding", fundingRoutes);

app.use("/api/funding/matches", matchingRoutes);

app.use("/api/documents", documentsRoutes);

app.use("/api/ai", aiRoutes);


app.use((_req, res) => {
  res.status(404).json({
    message: "API route not found.",
  });
});


app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("GLOBAL SERVER ERROR:", error);

    res.status(500).json({
      message: "Internal server error.",
    });
  }
);

export default app;
