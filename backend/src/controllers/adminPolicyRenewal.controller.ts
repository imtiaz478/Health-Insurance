import type { Request, Response } from "express";
import prisma from "../config/database.js";

export const getAllRenewalRequests = async (
  _req: Request,
  res: Response
) => {
  try {
    const renewals = await prisma.policyRenewal.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        policy: {
          select: {
            id: true,
            policyNumber: true,
            insuranceType: true,
            coverageAmount: true,
            premiumAmount: true,
            startDate: true,
            expiryDate: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      renewals,
    });
  } catch (error) {
    console.error("Get renewal requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch renewal requests.",
    });
  }
};

export const updateRenewalStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);
    const { status, rejectionReason } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid renewal status.",
      });
    }

    if (status === "REJECTED" && !rejectionReason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required.",
      });
    }

    const renewal = await prisma.policyRenewal.findUnique({
      where: {
        id,
      },
      include: {
        policy: true,
      },
    });

    if (!renewal) {
      return res.status(404).json({
        success: false,
        message: "Renewal request not found.",
      });
    }

    if (renewal.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "This renewal request has already been processed.",
      });
    }

    if (status === "REJECTED") {
      const updatedRenewal = await prisma.policyRenewal.update({
        where: {
          id,
        },
        data: {
          status: "REJECTED",
          rejectionReason: rejectionReason.trim(),
        },
      });

      return res.status(200).json({
        success: true,
        message: "Renewal request rejected successfully.",
        renewal: updatedRenewal,
      });
    }

    const oldExpiryDate = renewal.policy.expiryDate;

    const newExpiryDate = new Date(oldExpiryDate);
    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);

    const result = await prisma.$transaction(async (tx) => {
      const updatedPolicy = await tx.policy.update({
        where: {
          id: renewal.policyId,
        },
        data: {
          expiryDate: newExpiryDate,
          status: "ACTIVE",
        },
      });

      const updatedRenewal = await tx.policyRenewal.update({
        where: {
          id,
        },
        data: {
          status: "APPROVED",
          newExpiryDate,
          rejectionReason: null,
        },
      });

      return {
        updatedPolicy,
        updatedRenewal,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Policy renewal approved successfully.",
      renewal: result.updatedRenewal,
      policy: result.updatedPolicy,
    });
  } catch (error) {
    console.error("Update renewal status error:", error);

    return res.status(500).json({
      success: false,
      message: "can not update renewal request.",
    });
  }
};