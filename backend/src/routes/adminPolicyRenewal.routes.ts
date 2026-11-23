import { Router } from "express";
import {
  getAllRenewalRequests,
  updateRenewalStatus,
} from "../controllers/adminPolicyRenewal.controller.js";
import { adminAuth } from "../middleware/adminAuth.middleware.js";

const router = Router();

router.get(
  "/",
  adminAuth,
  getAllRenewalRequests
);

router.patch(
  "/:id/status",
  adminAuth,
  updateRenewalStatus
);

export default router;