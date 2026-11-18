
import { Router } from "express";

import {
  loginAdmin,
  getAdminProfile,
} from "../controllers/admin.controller.js";

import { adminAuth } from "../middleware/adminAuth.middleware.js";
import { getDashboardOverview , getAllCustomers, getAllQuotes, updateQuoteStatus} from "../controllers/adminDashboard.controller.js";




const router = Router();
router.get("/dashboard", adminAuth, getDashboardOverview);

router.post("/login", loginAdmin);

router.get("/profile", adminAuth, getAdminProfile);

router.get("/customers", adminAuth, getAllCustomers);

router.get("/quotes", adminAuth, getAllQuotes);

router.patch("/quotes/:id/status", adminAuth, updateQuoteStatus);

export default router;
