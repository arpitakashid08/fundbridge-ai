import { Router } from "express";

import {
  getGrantMatches,
} from "../controllers/grants.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getGrantMatches
);

export default router;