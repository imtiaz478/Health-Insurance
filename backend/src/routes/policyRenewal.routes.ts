import { Router } from "express";
import {
  createRenewalRequest,
  getMyRenewalRequests,
} from "../controllers/policyRenewal.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.post(
  "/request",
  customerAuth,
  createRenewalRequest
);

router.get(
  "/my-renewals",
  customerAuth,
  getMyRenewalRequests
);

export default router;