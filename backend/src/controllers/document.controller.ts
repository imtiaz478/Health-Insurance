import type { Response } from "express";
import path from "path";
import fs from "fs";
import prisma from "../config/database.js";
import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";

const allowedDocumentTypes = [
  "NID_FRONT",
  "NID_BACK",
  "CUSTOMER_PHOTO",
  "SUPPORTING_DOCUMENT",
  "OTHER",
];

export const uploadDocument = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;
    const { documentType, policyApplicationId, claimId } = req.body;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized customer.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });
    }

    if (!allowedDocumentTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document type.",
      });
    }

    if (policyApplicationId && claimId) {
      return res.status(400).json({
        success: false,
        message: "Upload a document for either an application or a claim.",
      });
    }

    if (policyApplicationId) {
      const application = await prisma.policyApplication.findFirst({
        where: {
          id: policyApplicationId,
          customerId,
        },
      });

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Policy application not found.",
        });
      }
    }

    if (claimId) {
      const claim = await prisma.claim.findFirst({
        where: {
          id: claimId,
          customerId,
        },
      });

      if (!claim) {
        return res.status(404).json({
          success: false,
          message: "Claim not found.",
        });
      }
    }

    const document = await prisma.document.create({
      data: {
        customerId,
        policyApplicationId: policyApplicationId || null,
        claimId: claimId || null,
        documentType,
        fileName: req.file.originalname,
        fileUrl: req.file.filename,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      document,
    });
  } catch (error) {
    console.error("Document upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload document.",
    });
  }
};

export const getMyDocuments = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized customer.",
      });
    }

    const documents = await prisma.document.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error("Get my documents error:", error);

    return res.status(500).json({
      success: false,
      message: "can not fetch your documents.",
    });
  }
};

export const viewMyDocumentFile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;
    const id = String(req.params.id);

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized customer.",
      });
    }

    const document = await prisma.document.findFirst({
      where: {
        id,
        customerId,
      },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    const fileName = path.basename(document.fileUrl);

    const filePath = path.join(
      process.cwd(),
      "private-documents",
      fileName
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Document file not found.",
      });
    }

    res.setHeader("Cache-Control", "no-store");

    return res.sendFile(filePath);
  } catch (error) {
    console.error("View customer document error:", error);

    return res.status(500).json({
      success: false,
      message: "can not view document.",
    });
  }
};