import { Router } from "express";
import {
  getAllDocuments,
  updateDocumentStatus,
  viewDocumentFile,
} from "../controllers/adminDocument.controller.js";
import { adminAuth } from "../middleware/adminAuth.middleware.js";

const router = Router();

router.get("/", adminAuth, getAllDocuments);

router.get("/:id/file", adminAuth, viewDocumentFile);

router.patch("/:id/status", adminAuth, updateDocumentStatus);

export default router;