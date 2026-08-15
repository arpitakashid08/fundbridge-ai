import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import fundingRoutes from "./routes/funding.routes.js";
import matchingRoutes from "./routes/matching.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import documentsRoutes from "./routes/documents.routes.js";
import grantsRoutes from "./routes/grants.routes.js";
import loansRoutes from "./routes/loans.routes.js";
import investorsRoutes from "./routes/investors.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://127.0.0.1:5175",
      "http://127.0.0.1:5176",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/grants", grantsRoutes);

app.use("/api/loans", loansRoutes);

app.use("/api/investors", investorsRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "FundBridge API is running.",
  });
});

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

app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log("🚀 FundBridge API");
  console.log("========================================");
  console.log(`📡 Server: http://127.0.0.1:${PORT}`);
  console.log(`❤️  Health: http://127.0.0.1:${PORT}/api/health`);
  console.log(`💰 Funding: http://127.0.0.1:${PORT}/api/funding`);
  console.log(
    `🎯 Matches: http://127.0.0.1:${PORT}/api/funding/matches`
  );
  console.log(`📂 Documents: http://127.0.0.1:${PORT}/api/documents`);
  console.log(`🤖 AI: http://127.0.0.1:${PORT}/api/ai`);
  console.log("========================================");
  console.log("");
});