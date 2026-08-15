const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const uploadDirectory = path.join(
  __dirname,
  "../../uploads"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      extension;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".pdf",
      ".png",
      ".jpg",
      ".jpeg",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return cb(
        new Error(
          "Unsupported file type."
        )
      );
    }

    cb(null, true);
  },
});

router.get("/", (req, res) => {
  res.json({
    success: true,

    documents: [
      {
        id: 1,
        name: "Business Registration Certificate",
        category: "Legal",
        status: "Verified",
      },
      {
        id: 2,
        name: "Company PAN Card",
        category: "Legal",
        status: "Verified",
      },
      {
        id: 3,
        name: "GST Registration Certificate",
        category: "Tax",
        status: "Under review",
      },
    ],
  });
});

router.post(
  "/upload",
  upload.single("document"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded.",
      });
    }

    res.status(201).json({
      success: true,

      message:
        "Document uploaded successfully.",

      name: req.file.originalname,

      filename: req.file.filename,

      size: req.file.size,

      path:
        `/uploads/${req.file.filename}`,

      status: "Under review",
    });
  }
);

module.exports = router;