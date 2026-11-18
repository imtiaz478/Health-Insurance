import { Router } from "express";
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
} from "../controllers/customerAuth.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

router.get("/profile", customerAuth, getCustomerProfile);

router.put("/profile", customerAuth, updateCustomerProfile);

export default router;