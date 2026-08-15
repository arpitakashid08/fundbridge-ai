import { Router } from "express";

import {
  getProfile,
  saveProfile,
} from "../controllers/profile.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getProfile);

router.put("/", authenticate, saveProfile);

export default router;