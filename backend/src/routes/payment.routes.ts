
import { Router } from "express";
import {
  createPayment,
  getMyPayments,
  getAllPayments,
  getPaymentById,
  processMockPayment,
} from "../controllers/payment.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";
import { adminAuth } from "../middleware/adminAuth.middleware.js";

const router = Router();

router.post("/", customerAuth, createPayment);
router.get("/my-payments", customerAuth, getMyPayments);
router.get("/admin/all", adminAuth, getAllPayments);
router.post("/mock-pay", customerAuth, processMockPayment);
router.get("/:id", customerAuth, getPaymentById);

export default router;
