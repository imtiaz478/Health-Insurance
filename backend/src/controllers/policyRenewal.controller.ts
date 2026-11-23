import type { Response } from "express";
import prisma from "../config/database.js";
import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";

export const createRenewalRequest = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;
    const { policyId } = req.body;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized customer.",
      });
    }

    if (!policyId) {
      return res.status(400).json({
        success: false,
        message: "Policy ID is required.",
      });
    }

    const policy = await prisma.policy.findFirst({
      where: {
        id: policyId,
        customerId,
      },
    });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    if (policy.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Cancelled policies cannot be renewed.",
      });
    }

    const existingRenewal = await prisma.policyRenewal.findFirst({
      where: {
        policyId,
        customerId,
        status: "PENDING",
      },
    });

    if (existingRenewal) {
      return res.status(400).json({
        success: false,
        message: "A renewal request is already pending.",
      });
    }

    const renewal = await prisma.policyRenewal.create({
      data: {
        policyId,
        customerId,
        oldExpiryDate: policy.expiryDate,
        premiumAmount: policy.premiumAmount,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Policy renewal request submitted successfully.",
      renewal,
    });
  } catch (error) {
    console.error("Create renewal request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create renewal request.",
    });
  }
};

export const getMyRenewalRequests = async (
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

    const renewals = await prisma.policyRenewal.findMany({
      where: {
        customerId,
      },
      include: {
        policy: {
          select: {
            id: true,
            policyNumber: true,
            insuranceType: true,
            premiumAmount: true,
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