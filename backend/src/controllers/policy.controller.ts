import type { Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/database.js";

const createPolicySchema = z.object({
  policyApplicationId: z.string().uuid(),
  policyNumber: z.string().min(3),
  premiumAmount: z.coerce.number().positive(),
  startDate: z.string(),
  expiryDate: z.string(),
  details: z.string().optional(),
});

export const createPolicy = async (
  req: Request,
  res: Response
) => {
  try {
    const validation = createPolicySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid policy data.",
        errors: validation.error.flatten(),
      });
    }

    const {
      policyApplicationId,
      policyNumber,
      premiumAmount,
      startDate,
      expiryDate,
      details,
    } = validation.data;

    const application = await prisma.policyApplication.findUnique({
      where: {
        id: policyApplicationId,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Policy application not found.",
      });
    }

    if (application.status !== "APPROVED") {
      return res.status(400).json({
        success: false,
        message: "Only approved applications can create a policy.",
      });
    }

    const existingPolicy = await prisma.policy.findFirst({
      where: {
        OR: [
          {
            policyNumber,
          },
          {
            policyApplicationId,
          },
        ],
      },
    });

    if (existingPolicy) {
      return res.status(400).json({
        success: false,
        message: "Policy already exists for this application or policy number.",
      });
    }

    const start = new Date(startDate);
    const expiry = new Date(expiryDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(expiry.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid start or expiry date.",
      });
    }

    if (expiry <= start) {
      return res.status(400).json({
        success: false,
        message: "Expiry date must be after start date.",
      });
    }

    const policy = await prisma.policy.create({
      data: {
        policyNumber,
        customerId: application.customerId,
        insuranceType: application.insuranceType,
        coverageAmount: application.coverageAmount,
        premiumAmount,
        startDate: start,
        expiryDate: expiry,
        details: details || application.details,
        policyApplicationId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Policy created successfully.",
      policy,
    });
  } catch (error) {
    console.error("Create policy error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create policy.",
    });
  }
};


export const getAllPolicies = async (
  req: Request,
  res: Response
) => {
  try {
    const policies = await prisma.policy.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        policyApplication: {
          select: {
            id: true,
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
      policies,
    });
  } catch (error) {
    console.error("Get all policies error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch policies.",
    });
  }
};


export const updatePolicyStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const schema = z.object({
      status: z.enum(["ACTIVE", "EXPIRED", "CANCELLED"]),
    });

    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid policy status.",
      });
    }

    const policy = await prisma.policy.findUnique({
      where: {
        id,
      },
    });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    const updatedPolicy = await prisma.policy.update({
      where: {
        id,
      },
      data: {
        status: validation.data.status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Policy status updated successfully.",
      policy: updatedPolicy,
    });
  } catch (error) {
    console.error("Update policy status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update policy status.",
    });
  }
};


export const deletePolicy = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const policy = await prisma.policy.findUnique({
      where: {
        id,
      },
    });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    await prisma.policy.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Policy deleted successfully.",
    });
  } catch (error) {
    console.error("Delete policy error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete policy.",
    });
  }
};


export const getMyPolicies = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = (req as any).customerId;

    if (!customerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const policies = await prisma.policy.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        policyApplication: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      policies,
    });
  } catch (error) {
    console.error("Get my policies error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your policies.",
    });
  }
};


export const getPolicyById = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = (req as any).customerId;
    const { id } = req.params;

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
        policyApplication: true,
      },
    });

    if (!policy) {
      return res.status(404).json({
        success: false,
        message: "Policy not found.",
      });
    }

    return res.status(200).json({
      success: true,
      policy,
    });
  } catch (error) {
    console.error("Get policy details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch policy details.",
    });
  }
};