import { Router } from "express";

import {
  getFundingOpportunities,
} from "../controllers/funding.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getFundingOpportunities
);

export default router;