
import { Router } from "express";

import {
  createPolicyApplication,
  getMyPolicyApplications,
} from "../controllers/policyApplication.controller.js";

import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.post("/", customerAuth, createPolicyApplication);

router.get("/my-applications", customerAuth, getMyPolicyApplications);

export default router;
