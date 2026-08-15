import { Router } from "express";

import {
  getFundingMatches,
} from "../controllers/matching.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getFundingMatches
);

export default router;