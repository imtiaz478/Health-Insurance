import { Router } from "express";
import {
  createClaim,
  getMyClaims,
} from "../controllers/claim.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

// Submit a new claim
router.post("/", createClaim);

// Get logged-in customer's claims
router.get("/my-claims", customerAuth, getMyClaims);

export default router;