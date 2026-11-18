
import type { Response } from "express";
import { z } from "zod";
import prisma from "../config/database.js";
import type { AuthenticatedRequest } from "../middleware/customerAuth.middleware.js";

const policyApplicationSchema = z.object({
  insuranceType: z.enum([
    "HEALTH",
    "MOTOR",
    "FIRE",
    "MARINE",
    "ENGINEERING",
    "TRAVEL",
    "LIFE",
    "OTHER",
  ]),
  coverageAmount: z.number().positive().max(1000000000),
  details: z.string().optional(),
});

// Submit a new policy application
export const createPolicyApplication = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const validation = policyApplicationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid application information.",
        errors: validation.error.issues,
      });
    }

    const customerId = req.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const { insuranceType, coverageAmount, details } = validation.data;

    const application = await prisma.policyApplication.create({
      data: {
        customerId,
        insuranceType,
        coverageAmount,
        details,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Policy application submitted successfully!",
      data: application,
    });
  } catch (error) {
    console.error("Policy application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit policy application.",
    });
  }
};

// Get logged-in customer's applications
export const getMyPolicyApplications = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const customerId = req.customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const applications = await prisma.policyApplication.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Policy applications fetched successfully.",
      data: applications,
    });
  } catch (error) {
    console.error("Get policy applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch policy applications.",
    });
  }
};
