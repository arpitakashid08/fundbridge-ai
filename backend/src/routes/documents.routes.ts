import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import prisma from "../config/prisma.js";
import { authenticate } from "../middleware/auth.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const uploadDirectory = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
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
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      return cb(new Error("Unsupported file type."));
    }
    cb(null, true);
  },
});

export function getRecommendedChecklist(stage: string | null, industry: string | null) {
  const isIdea = !stage || stage.toLowerCase().includes("idea") || stage.toLowerCase().includes("pre");
  const isHealth = industry?.toLowerCase().includes("health") || industry?.toLowerCase().includes("med");

  return [
    {
      id: "doc-1",
      name: "Business Registration Certificate",
      category: "Legal",
      status: "Verified" as const,
      size: "1.2 MB",
      updated: "Verified",
      required: true,
    },
    {
      id: "doc-2",
      name: "Company PAN Card / Tax Identifier",
      category: "Legal",
      status: "Verified" as const,
      size: "840 KB",
      updated: "Verified",
      required: true,
    },
    {
      id: "doc-3",
      name: isHealth ? "Medical Device / Clinical Compliance Note" : "GST Registration Certificate",
      category: "Compliance",
      status: "Under review" as const,
      size: "1.5 MB",
      updated: "Recent",
      required: true,
    },
    {
      id: "doc-4",
      name: isIdea ? "Prototype & Market Validation Document" : "Audited Financial Statements (Last 2 Years)",
      category: isIdea ? "Technical" : "Financial",
      status: "Action required" as const,
      size: "2.1 MB",
      updated: "Action needed",
      required: true,
    },
    {
      id: "doc-5",
      name: `${industry || "Business"} Pitch Deck`,
      category: "Business",
      status: "Verified" as const,
      size: "4.5 MB",
      updated: "Recent",
      required: false,
    },
    {
      id: "doc-6",
      name: isIdea ? "Milestone-based 12-Month Budget Plan" : "Bank Statement & Debt Cash-Flow Model",
      category: "Financial",
      status: "Missing" as const,
      size: "—",
      updated: "Not uploaded",
      required: true,
    },
  ];
}
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const userDocs = await prisma.document.findMany({
      where: { userId },
      orderBy: { uploadedAt: "desc" },
    });

    const profile = await prisma.businessProfile.findUnique({ where: { userId } });
    const recommendedChecklist = getRecommendedChecklist(profile?.businessStage || null, profile?.industry || null);

    const formattedUploaded = userDocs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      category: "Uploaded",
      status: (doc.status as any) || "Under review",
      size: "Uploaded",
      updated: doc.uploadedAt.toLocaleDateString("en-IN"),
      required: false,
      fileUrl: doc.fileUrl,
    }));

    return res.status(200).json({
      documents: [...formattedUploaded, ...recommendedChecklist],
      profile,
    });
  } catch (error) {
    console.error("GET DOCUMENTS ERROR:", error);
    return res.status(500).json({ message: "Unable to load documents." });
  }
});
router.post("/upload", authenticate, upload.single("document"), async (req, res) => {
  try {
    const userId = req.userId!;
    if (!req.file) {
      return res.status(400).json({ message: "No document uploaded." });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const ext = path.extname(req.file.originalname).replace(".", "").toUpperCase() || "DOC";

    const doc = await prisma.document.create({
      data: {
        userId,
        name: req.file.originalname,
        type: ext,
        fileUrl,
        status: "Under review",
      },
    });

    return res.status(201).json({
      message: "Document uploaded successfully.",
      document: {
        id: doc.id,
        name: doc.name,
        category: "Uploaded",
        status: "Under review",
        size: `${(req.file.size / 1024 / 1024).toFixed(1)} MB`,
        updated: "Just now",
        required: false,
        fileUrl: doc.fileUrl,
      },
    });
  } catch (error) {
    console.error("UPLOAD DOCUMENT ERROR:", error);
    return res.status(500).json({ message: "Unable to upload document." });
  }
});
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const userId = req.userId!;
    const targetId = String(req.params.id);

    await prisma.document.deleteMany({
      where: { id: targetId, userId },
    });

    return res.status(200).json({ message: "Document removed." });
  } catch (error) {
    console.error("DELETE DOCUMENT ERROR:", error);
    return res.status(500).json({ message: "Unable to delete document." });
  }
});

export default router;
