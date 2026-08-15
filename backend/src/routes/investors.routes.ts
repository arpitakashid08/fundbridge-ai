import { Router } from "express";

import {
  getInvestorMatches,
} from "../controllers/investors.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getInvestorMatches
);

export default router;