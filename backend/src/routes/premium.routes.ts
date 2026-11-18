
import { Router } from "express";
import {
  calculateInsurancePremium,
} from "../controllers/premium.controller.js";

const router = Router();

router.post("/calculate", calculateInsurancePremium);

export default router;
