import { Router } from "express";
import {
  uploadDocument,
  getMyDocuments,
  viewMyDocumentFile,
} from "../controllers/document.controller.js";
import { customerAuth } from "../middleware/customerAuth.middleware.js";
import documentUpload from "../middleware/documentUpload.middleware.js";

const router = Router();

router.get("/my-documents", customerAuth, getMyDocuments);

router.get("/:id/file", customerAuth, viewMyDocumentFile);

router.post(
  "/upload",
  customerAuth,
  documentUpload.single("document"),
  uploadDocument
);

export default router;