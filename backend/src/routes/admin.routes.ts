
import { Router } from "express";

import {
  loginAdmin,
  getAdminProfile,
} from "../controllers/admin.controller.js";

import {
  getDashboardOverview,
  getAllCustomers,
  getAllQuotes,
  updateQuoteStatus,
  getAllClaims,
  updateClaimStatus,
  getAllPolicyApplications,
  updatePolicyApplicationStatus,
} from "../controllers/adminDashboard.controller.js";

import { adminAuth } from "../middleware/adminAuth.middleware.js";

const router = Router();

// Admin Authentication
router.post("/login", loginAdmin);
router.get("/profile", adminAuth, getAdminProfile);

// Dashboard
router.get("/dashboard", adminAuth, getDashboardOverview);

// Customers
router.get("/customers", adminAuth, getAllCustomers);

// Quotes
router.get("/quotes", adminAuth, getAllQuotes);
router.patch("/quotes/:id/status", adminAuth, updateQuoteStatus);

// Claims
router.get("/claims", adminAuth, getAllClaims);
router.patch("/claims/:id/status", adminAuth, updateClaimStatus);


router.get(
  "/policy-applications",
  adminAuth,
  getAllPolicyApplications
);

router.patch(
  "/policy-applications/:id/status",
  adminAuth,
  updatePolicyApplicationStatus
);

export default router;
