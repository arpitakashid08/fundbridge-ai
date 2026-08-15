const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const uploadsPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

app.use(
  "/uploads",
  express.static(uploadsPath)
);

/* ---------------- HEALTH CHECK ---------------- */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FundBridge backend is running",
    timestamp: new Date().toISOString(),
  });
});

/* ---------------- DOCUMENT ROUTES ---------------- */

const documentsRouter = require("./routes/documents");

app.use(
  "/api/documents",
  documentsRouter
);

/* ---------------- ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/* ---------------- START SERVER ---------------- */

app.listen(PORT, () => {
  console.log(
    `FundBridge backend running on http://localhost:${PORT}`
  );
});