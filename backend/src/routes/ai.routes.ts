import { Router } from "express";

import {
  askFundBridgeAI,
  getFundingStrategy,
} from "../controllers/ai.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/ask",
  authenticate,
  askFundBridgeAI
);

router.get(
  "/strategy",
  authenticate,
  getFundingStrategy
);

export default router;
