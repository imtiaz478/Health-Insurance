import { Router } from "express";
import {
  createPolicy,
  getAllPolicies,
  updatePolicyStatus,
  deletePolicy,
  getMyPolicies,
  getPolicyById

} from "../controllers/policy.controller.js";
import { adminAuth } from "../middleware/adminAuth.middleware.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.post(
  "/",
  adminAuth,
  createPolicy
);

router.get(
  "/",
  adminAuth,
  getAllPolicies
);

router.patch(
  "/:id/status",
  adminAuth,
  updatePolicyStatus
);

router.delete(
  "/:id",
  adminAuth,
  deletePolicy
);


router.get(
  "/my-policies",
  customerAuth,
  getMyPolicies
);


router.get(
  "/:id",
  customerAuth,
  getPolicyById
);


export default router;