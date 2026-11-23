import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import prisma from "../config/database.js";

export const getAllDocuments = async (
  _req: Request,
  res: Response
) => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        policyApplication: true,
        claim: true,
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
    console.error("Get documents error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch documents.",
    });
  }
};

export const updateDocumentStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);
    const { status, rejectionReason } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document status.",
      });
    }

    if (status === "REJECTED" && !rejectionReason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required.",
      });
    }

    const existingDocument = await prisma.document.findUnique({
      where: { id },
    });

    if (!existingDocument) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    const document = await prisma.document.update({
      where: { id },
      data: {
        status,
        rejectionReason:
          status === "REJECTED" ? rejectionReason.trim() : null,
        verifiedAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: `Document ${status.toLowerCase()} successfully.`,
      document,
    });
  } catch (error) {
    console.error("Update document status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update document status.",
    });
  }
};

export const viewDocumentFile = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const document = await prisma.document.findUnique({
      where: { id },
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
    console.error("View document error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to view document.",
    });
  }
};