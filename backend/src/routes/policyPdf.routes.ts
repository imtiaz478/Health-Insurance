import { Router } from "express";
import { downloadPolicyPdf } from "../controllers/policyPdf.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.get(
  "/:id/pdf",
  customerAuth,
  downloadPolicyPdf
);

export default router;