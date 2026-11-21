import type { Response } from "express";
import PDFDocument from "pdfkit";
import prisma from "../config/database.js";
import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";

export const downloadPolicyPdf = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;
    const { id } = req.params;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized customer.",
      });
    }

    const policy = await prisma.policy.findFirst({
      where: {
        id,
        customerId,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const fileName = `policy-${policy.policyNumber}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("PURABI GENERAL INSURANCE COMPANY LIMITED", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(18)
      .text("INSURANCE POLICY CERTIFICATE", {
        align: "center",
      });

    doc.moveDown(2);

    doc.fontSize(12);

    doc.text(`Policy Number: ${policy.policyNumber}`);

    doc.moveDown();

    doc.text(`Customer Name: ${policy.customer.name}`);

    doc.text(`Email: ${policy.customer.email ?? "N/A"}`);

    doc.text(`Phone: ${policy.customer.phone}`);

    doc.moveDown();

    doc.text(`Insurance Type: ${policy.insuranceType}`);

    doc.text(
      `Coverage Amount: BDT ${Number(
        policy.coverageAmount
      ).toLocaleString()}`
    );

    doc.text(
      `Premium Amount: BDT ${Number(
        policy.premiumAmount
      ).toLocaleString()}`
    );

    doc.moveDown();

    doc.text(
      `Policy Status: ${policy.status}`
    );

    doc.moveDown(2);

    doc
      .fontSize(11)
      .text(
        "This document is an electronically generated insurance policy certificate."
      );

    doc.moveDown();

    doc.text(
      "Please keep this document for your records."
    );

    doc.end();
  } catch (error) {
    console.error("Policy PDF error:", error);

    // PDF stream already started হলে আর JSON response পাঠাব না
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate policy PDF.",
      });
    }
  }
};