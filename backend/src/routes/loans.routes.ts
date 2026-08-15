import { Router } from "express";

import {
  getLoanMatches,
} from "../controllers/loans.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getLoanMatches
);

export default router;